<?php

namespace App\_Sl;


use App\Models\Project;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class TagAttacher
{

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
}
