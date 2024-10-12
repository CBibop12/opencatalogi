<?php

namespace OCA\OpenCatalogi\Db;

use OCA\OpenCatalogi\Db\Listing;
use OCA\OpenCatalogi\Db\Organisation;
use OCP\AppFramework\Db\Entity;
use OCP\AppFramework\Db\QBMapper;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;
use Symfony\Component\Uid\Uuid;

class ListingMapper extends QBMapper
{
	public function __construct(IDBConnection $db)
	{
		parent::__construct($db, tableName: 'ocat_listings');
	}

	public function find(int $id): Listing
	{
		$qb = $this->db->getQueryBuilder();

        $qb->select('*')
        ->from('ocat_listings')
        ->where(
            $qb->expr()->eq('l.id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT))
        );

		return $this->findEntityCustom(query: $qb);
	}

	/**
	 * Returns a db result and throws exceptions when there are more or less
	 * results CUSTOM FOR JOINS
	 *
	 * @param IQueryBuilder $query
	 * @return Entity the entity
	 * @psalm-return T the entity
	 * @throws Exception
	 * @throws MultipleObjectsReturnedException if more than one item exist
	 * @throws DoesNotExistException if the item does not exist
	 * @since 14.0.0
	 */
	protected function findEntityCustom(IQueryBuilder $query): Entity {
		return $this->mapRowToEntityCustom($this->findOneQuery($query));
	}

    /**
     *  CUSTOM FOR JOINS
     */
    protected function mapRowToEntityCustom(array $row): Entity {
		unset($row['DOCTRINE_ROWNUM']); // remove doctrine/dbal helper column

        // Map the Organisation fields to a sub-array
        $organisationData = [
            'id' => $row['organisation_id'] ?? null,
            'title' => $row['organisation_title'] ?? null,
            'summary' => $row['organisation_summary'] ?? null,
            'description' => $row['organisation_description'] ?? null,
            'image' => $row['organisation_image'] ?? null,
            'oin' => $row['organisation_oin'] ?? null,
            'tooi' => $row['organisation_tooi'] ?? null,
            'rsin' => $row['organisation_rsin'] ?? null,
            'pki' => $row['organisation_pki'] ?? null,
        ];

        $organisationIsEmpty = true;
        foreach ($organisationData as $key => $value) {
            if ($value !== null) {
                $organisationIsEmpty = false;
            }

            if (array_key_exists("organisation_$key", $row) === true) {
                unset($row["organisation_$key"]);
            }
        }

        $row['organisation'] = $organisationIsEmpty === true ? null : json_encode(Organisation::fromRow($organisationData)->jsonSerialize());

		return \call_user_func($this->entityClass .'::fromRow', $row);
	}

	/**
	 * Runs a sql query and returns an array of entities CUSTOM FOR JOINS
	 *
	 * @param IQueryBuilder $query
	 * @return Entity[] all fetched entities
	 * @psalm-return T[] all fetched entities
	 * @throws Exception
	 * @since 14.0.0
	 */
	protected function findEntitiesCustom(IQueryBuilder $query): array {
		$result = $query->executeQuery();
		try {
			$entities = [];
			while ($row = $result->fetch()) {
				$entities[] = $this->mapRowToEntityCustom($row);
			}
			return $entities;
		} finally {
			$result->closeCursor();
		}
	}

    public function findAll(?int $limit = null, ?int $offset = null, ?array $filters = [], ?array $searchConditions = [], ?array $searchParams = []): array
    {
        $qb = $this->db->getQueryBuilder();

        $qb->select('*')
            ->from('ocat_listings')
            ->setMaxResults($limit)
            ->setFirstResult($offset);


        // Apply filters
        foreach ($filters as $filter => $value) {
            if ($value === 'IS NOT NULL') {
                $qb->andWhere($qb->expr()->isNotNull($filter));
            } elseif ($value === 'IS NULL') {
                $qb->andWhere($qb->expr()->isNull($filter));
            } else {
                $qb->andWhere($qb->expr()->eq($filter, $qb->createNamedParameter($value)));
            }
        }

        // Apply search conditions
        if (!empty($searchConditions)) {
            $qb->andWhere('(' . implode(' OR ', $searchConditions) . ')');
            foreach ($searchParams as $param => $value) {
                $qb->setParameter($param, $value);
            }
        }

        // Use the existing findEntities method to fetch and map the results
        return $this->findEntitiesCustom($qb);
    }

	public function createFromArray(array $object): Listing
	{
		$listing = new Listing();
		$listing->hydrate(object: $object);

		// Set uuid if not provided
		if($obj->getUuid() === null){
			$obj->setUuid(Uuid::v4());
		}

		$listing = $this->insert(entity: $listing);

		return $this->find($listing->getId());
	}

	public function updateFromArray(int $id, array $object): Listing
	{
		$listing = $this->find($id);
		$listing->hydrate($object);
		
		// Update the version
		$version = explode('.', $obj->getVersion());
		$version[2] = (int)$version[2] + 1;
		$obj->setVersion(implode('.', $version));

		return $this->update($listing);
	}
}
