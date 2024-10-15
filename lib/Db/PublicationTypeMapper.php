<?php

namespace OCA\OpenCatalogi\Db;

use OCA\OpenCatalogi\Db\Publication;
use OCP\AppFramework\Db\Entity;
use OCP\AppFramework\Db\QBMapper;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;
use Symfony\Component\Uid\Uuid;

/**
 * Class PublicationTypeMapper
 *
 * This class is responsible for mapping PublicationType entities to and from the database.
 * It provides methods for finding, creating, updating, and querying PublicationType entities.
 */
class PublicationTypeMapper extends QBMapper
{
	/**
	 * Constructor for PublicationTypeMapper
	 *
	 * @param IDBConnection $db The database connection
	 */
	public function __construct(IDBConnection $db)
	{
		parent::__construct($db, tableName: 'ocat_publication_types');
	}

	/**
	 * Find a PublicationType by its ID or UUID
	 *
	 * @param int|string $id The ID or UUID of the PublicationType
	 * @param array|null $extend Optional array for future extending functionality
	 * @return PublicationType The found PublicationType entity
	 * @throws \OCP\AppFramework\Db\DoesNotExistException If the entity is not found
	 * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException If multiple entities are found
	 */
	public function find($id, ?array $extend = []): PublicationType
	{
		$qb = $this->db->getQueryBuilder();

		$qb->select('*')
			->from('ocat_publication_types')
			->where($qb->expr()->orX(
				$qb->expr()->eq('id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)),
				$qb->expr()->eq('uuid', $qb->createNamedParameter($id, IQueryBuilder::PARAM_STR))
			));

		$entity = $this->findEntity(query: $qb);

		// TODO: Implement extending functionality
        if (!empty($extend)) {
			// todo: implement extending
		}

		return $entity;
	}

	/**
	 * Find multiple PublicationTypes by their IDs or UUIDs
	 *
	 * @param array $ids An array of IDs or UUIDs
	 * @return array An array of found PublicationType entities
	 */
	public function findMultiple(array $ids): array
	{
		$qb = $this->db->getQueryBuilder();

		$qb->select('*')
			->from('ocat_publication_types')
			->where($qb->expr()->orX(
				$qb->expr()->in('id', $qb->createNamedParameter($ids, IQueryBuilder::PARAM_INT_ARRAY)),
				$qb->expr()->in('uuid', $qb->createNamedParameter($ids, IQueryBuilder::PARAM_STR_ARRAY))
			));

		return $this->findEntities(query: $qb);
	}

	/**
	 * Find all PublicationTypes with optional filtering, searching, and ordering
	 *
	 * @param int|null $limit Maximum number of results to return
	 * @param int|null $offset Number of results to skip
	 * @param array|null $filters Associative array of filters
	 * @param array|null $searchConditions Array of search conditions
	 * @param array|null $searchParams Array of search parameters
	 * @param array|null $orderBy Array of ordering criteria
	 * @param array|null $extend Optional array for future extending functionality
	 * @return array An array of found PublicationType entities
	 */
	public function findAll(
		?int $limit = null,
		?int $offset = null,
		?array $filters = [],
		?array $searchConditions = [],
		?array $searchParams = [],
		?array $orderBy = [],
		?array $extend = []
	): array
	{
		$qb = $this->db->getQueryBuilder();

		$qb->select('*')
			->from('ocat_publication_types')
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
        if (empty($searchConditions) === false) {
            $qb->andWhere('(' . implode(' OR ', $searchConditions) . ')');
            foreach ($searchParams as $param => $value) {
                $qb->setParameter($param, $value);
            }
        }

		$entities = $this->findEntities(query: $qb);

		// TODO: Implement extending functionality
        if (!empty($extend)) {
			// todo: implement extending
		}

		return $entities;
	}

	/**
	 * Create a new PublicationType from an array of data
	 *
	 * @param array $object An array of PublicationType data
	 * @return PublicationType The newly created PublicationType entity
	 */
	public function createFromArray(array $object): PublicationType
	{
		$publicationType = new PublicationType();
		$publicationType->hydrate(object: $object);

		// Set uuid if not provided
		if ($publicationType->getUuid() === null){
			$publicationType->setUuid(Uuid::v4());
		}
		return $this->insert(entity: $publicationType);
	}

	/**
	 * Update an existing PublicationType from an array of data
	 *
	 * @param int $id The ID of the PublicationType to update
	 * @param array $object An array of updated PublicationType data
	 * @return PublicationType The updated PublicationType entity
	 * @throws \OCP\AppFramework\Db\DoesNotExistException If the entity is not found
	 * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException If multiple entities are found
	 */
	public function updateFromArray(int $id, array $object): PublicationType
	{
		$publicationType = $this->find($id);
		$publicationType->hydrate($object);

		// Update the version
		$version = explode('.', $publicationType->getVersion());
		$version[2] = (int)$version[2] + 1;
		$publicationType->setVersion(implode('.', $version));

		return $this->update($publicationType);
	}
}
