<?php

namespace OCA\OpenCatalogi\Db;

use OCA\OpenCatalogi\Db\Publication;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\Entity;
use OCP\AppFramework\Db\MultipleObjectsReturnedException;
use OCP\AppFramework\Db\QBMapper;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;
use Symfony\Component\Uid\Uuid;

/**
 * Class AttachmentMapper
 *
 * This class is responsible for mapping Attachment entities to and from the database.
 * It provides methods for finding, creating, updating, and querying Attachment entities.
 *
 * @package OCA\OpenCatalogi\Db
 */
class AttachmentMapper extends QBMapper
{
	/**
	 * Constructor for AttachmentMapper
	 *
	 * @param IDBConnection $db The database connection
	 */
	public function __construct(IDBConnection $db)
	{
		parent::__construct($db, tableName: 'ocat_attachments');
	}

	/**
	 * Find an Attachment by its ID or UUID
	 *
	 * @param int|string $id The ID or UUID of the Attachment
	 * @return Attachment The found Attachment entity
	 * @throws DoesNotExistException If the entity is not found
	 * @throws MultipleObjectsReturnedException If multiple entities are found
	 */
	public function find($id): Attachment
	{
		$qb = $this->db->getQueryBuilder();

		$qb->select('*')
			->from('ocat_attachments')
			->where($qb->expr()->orX(
				$qb->expr()->eq('id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)),
				$qb->expr()->eq('uuid', $qb->createNamedParameter($id, IQueryBuilder::PARAM_STR))
			));

		return $this->findEntity(query: $qb);
	}

	/**
	 * Find multiple Attachments by their IDs or UUIDs
	 *
	 * @param array $ids An array of IDs or UUIDs
	 * @return array An array of found Attachment entities
	 */
	public function findMultiple(array $ids): array
	{
		$qb = $this->db->getQueryBuilder();

		$qb->select('*')
			->from('ocat_attachments')
			->where($qb->expr()->orX(
				$qb->expr()->in('id', $qb->createNamedParameter($ids, IQueryBuilder::PARAM_INT_ARRAY)),
				$qb->expr()->in('uuid', $qb->createNamedParameter($ids, IQueryBuilder::PARAM_STR_ARRAY))
			));

		return $this->findEntities(query: $qb);
	}

	/**
	 * Find all Attachments with optional limit and offset
	 *
	 * @param int|null $limit Maximum number of results to return
	 * @param int|null $offset Number of results to skip
	 * @return array An array of all found Attachment entities
	 */
	public function findAll($limit = null, $offset = null): array
	{
		$qb = $this->db->getQueryBuilder();

		$qb->select('*')
			->from('ocat_attachments')
			->setMaxResults($limit)
			->setFirstResult($offset);

		return $this->findEntities(query: $qb);
	}

	/**
	 * Create a new Attachment from an array of data
	 *
	 * @param array $object An array of Attachment data
	 * @return Attachment The newly created Attachment entity
	 */
	public function createFromArray(array $object): Attachment
	{
		$attachment = new Attachment();
		$attachment->hydrate(object: $object);

		// Set uuid if not provided
		if ($attachment->getUuid() === null){
			$attachment->setUuid(Uuid::v4());
		}

		return $this->insert(entity: $attachment);
	}

	/**
	 * Update an existing Attachment from an array of data
	 *
	 * @param int $id The ID of the Attachment to update
	 * @param array $object An array of updated Attachment data
	 * @param bool $updateVersion If we should update the version or not, default = true.
	 *
	 * @return Attachment The updated Attachment entity
	 * @throws DoesNotExistException If the entity is not found
	 * @throws MultipleObjectsReturnedException|\OCP\DB\Exception If multiple entities are found
	 */
	public function updateFromArray(int $id, array $object, bool $updateVersion = true): Attachment
	{
		$attachment = $this->find($id);
		$attachment->hydrate($object);

		if ($updateVersion === true) {
			// Update the version
			$version = explode('.', $attachment->getVersion());
			$version[2] = (int)$version[2] + 1;
			$attachment->setVersion(implode('.', $version));
		}

		return $this->update($attachment);
	}
}
