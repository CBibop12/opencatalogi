<?php

namespace OCA\OpenCatalogi\Db;

use DateTime;
use JsonSerializable;
use OCP\AppFramework\Db\Entity;

class Organization extends Entity implements JsonSerializable
{

	protected ?string $title 	   = null;
	protected ?string $summary     = null;
	protected ?string $description = null;
	protected ?string $image       = null;
	protected ?string $oin  	   = null;
	protected ?string $tooi		   = null;
	protected ?string $rsin		   = null;
	protected ?string $pki         = null;

	public function __construct() {
		$this->addType(fieldName: 'title', type: 'string');
		$this->addType(fieldName: 'summary', type: 'string');
		$this->addType(fieldName: 'description', type: 'string');
		$this->addType(fieldName: 'image', type: 'string');
		$this->addType(fieldName: 'oin', type: 'string');
		$this->addType(fieldName: 'tooi', type: 'string');
		$this->addType(fieldName: 'rsin', type: 'string');
		$this->addType(fieldName: 'pki', type: 'string');

	}

	public function hydrate(array $object): self
	{
		foreach($object as $key => $value) {
			$method = 'set'.ucfirst($key);

			try {
				$this->$method($value);
			} catch (\Exception $exception) {

			}
		}

		return $this;
	}

	public function jsonSerialize(): array
	{
		return [
			'id'          => $this->id,
			'title'       => $this->title,
			'summary'     => $this->summary,
			'description' => $this->description,
			'image'       => $this->image,
			'oin'         => $this->oin,
			'tooi'        => $this->tooi,
			'rsin'        => $this->rsin,
			'pki'	      => $this->pki,
		];
	}
}
