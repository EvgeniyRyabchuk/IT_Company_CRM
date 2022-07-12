<?php

namespace Database\Factories\Creators;

class StaticCreator
{
    private $model;

    function __construct($model) {
        $this->model = $model;
    }

    public function createForManyOwnersRandomly($owners, $count, $foreignKeyName, $ownerIdentiryName)
    {
        return $this->model::factory($count)->create()
            ->each(function ($created) use ($ownerIdentiryName, $foreignKeyName, $owners) {
                $owner = $this->getRandomItemOfCollection($owners);
                $created->$foreignKeyName = $owner->$ownerIdentiryName;
                $created->save();
            });
    }

    public function createForOneOwner($owner, $count, $foreignKeyName, $ownerIdentiryName)
    {
        return $this->model::factory($count)->create()
            ->each(function ($created) use($ownerIdentiryName, $foreignKeyName, $owner) {
                $created->$foreignKeyName = $owner->$ownerIdentiryName;
                $created->save();
            });
    }

    public function createForOneOwnerAndManyChild($owners, $count, $properties)
    {
        return $this->model::factory($count)->create()
            ->each(function ($created) use($properties, $owners) {
                for($i = 0; $i < count($owners); $i++) {
                    $owner = $owners[$i];
                    $foreignKeyName = $properties[$i][0];
                    $ownerIdentiryName = $properties[$i][1];

                    $created->$foreignKeyName = $owner->$ownerIdentiryName;
                }
                $created->save();
            });
    }

    private function getRandomItemOfCollection($colletion) {
        $limit = count($colletion) - 1;
        $index = rand(0, $limit);
        return $colletion[$index];
    }

    public function createForManyOwnersRandomlyAndManyChild($owners, $count, $properties)
    {
        return $this->model::factory($count)->create()
            ->each(function ($created) use($properties, $owners) {
                for($i = 0; $i < count($owners); $i++) {
                    $owner = $this->getRandomItemOfCollection($owners[$i]);
                    $foreignKeyName = $properties[$i][0];
                    $ownerIdentiryName = $properties[$i][1];
                    $created->$foreignKeyName = $owner->$ownerIdentiryName;
                }
                $created->save();
            });
    }





    private function setParamsToModel($params, $created) {
        foreach ($params as $param) {
            $p = $param[0];
            $created->$p = $param[1];
        }
    }


    public function createForManyOwnersRandomlyWithParams($owners, $count, $foreignKeyName, $ownerIdentiryName, $params)
    {
        return $this->model::factory($count)->create()
            ->each(function ($created) use ($ownerIdentiryName, $foreignKeyName, $owners, $params) {
                $owner = $this->getRandomItemOfCollection($owners);
                $created->$foreignKeyName = $owner->$ownerIdentiryName;
                $this->setParamsToModel($params, $created);
                $created->save();
            });
    }

    public function createForOneOwnerWithParams($owner, $count, $foreignKeyName, $ownerIdentiryName, $params)
    {
        return $this->model::factory($count)->create()
            ->each(function ($created) use($ownerIdentiryName, $foreignKeyName, $owner, $params) {
                $created->$foreignKeyName = $owner->$ownerIdentiryName;
                $this->setParamsToModel($params, $created);
                $created->save();
            });
    }

    public function createForOneOwnerAndManyChildWithParams($owners, $count, $properties, $params)
    {
        return $this->model::factory($count)->create()
            ->each(function ($created) use($properties, $owners, $params) {
                for($i = 0; $i < count($owners); $i++) {
                    $owner = $owners[$i];
                    $foreignKeyName = $properties[$i][0];
                    $ownerIdentiryName = $properties[$i][1];
                    $created->$foreignKeyName = $owner->$ownerIdentiryName;
                }
                $this->setParamsToModel($params, $created);
                $created->save();
            });
    }


    public function createForManyOwnersRandomlyAndManyChildWithParams($owners, $count, $properties, $params)
    {
        return $this->model::factory($count)->create()
            ->each(function ($created) use($properties, $owners, $params) {

                for($i = 0; $i < count($owners); $i++) {

                    $owner = $this->getRandomItemOfCollection($owners[$i]);
                    $foreignKeyName = $properties[$i][0];
                    $ownerIdentiryName = $properties[$i][1];

                    $created->$foreignKeyName = $owner->$ownerIdentiryName;
                }
                $this->setParamsToModel($params, $created);
                $created->save();
            });
    }



}
