<?php

namespace App\_Sl;


use App\Models\Project;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class TagAttacher
{
    protected static $tagbleList = [
        'projects',
        'users',
        'orders'
    ];


    protected static function modelAvailable($modelName) {
        foreach (TagAttacher::$tagbleList as $item) {
            if($item == $modelName) {
                return true;
            }
        }
        return false;
    }


  public static function attachToManyRandom($modelClass) {
      $tags = Tag::all();
      foreach ($modelClass::all() as $model) {
          $randCount = rand(1, count($tags));
          $randTags = Tag::inRandomOrder()->take($randCount)->get();

          foreach ($randTags as $tag) {
              $model->tags()->attach($tag);
          }
      }
  }

  public static function attachToModel($class, $id, $tagName) {

      $tagble = $class::findOrFail($id);

      $tag = Tag::firstOrCreate(['name' => $tagName]);

      $tagble->tags()->attach($tag);

      $tagble->save();

      return $tagble;
  }

    public static function detachToModel($class, $id, $tagName) {

        $tagble = $class::with('tags')->findOrFail($id);

        $tag = Tag::where(['name' => $tagName])->first();

        abort_if(!$tag, 404, 'tag does not exist');

        $tagble->tags()->detach($tag);

        $tagble->save() ;

        return $tagble;
    }

    public static function getModelByTableName($tableName) {

        if(!TagAttacher::modelAvailable($tableName))
           return null;

        $folderName = 'App\\Models';
        $name =  $folderName . '\\' . Str::studly(strtolower(STR::singular($tableName)));

        $clearStr = str_replace('"', "", $name);
        $_class = new $clearStr();
        return $_class;
    }
}
