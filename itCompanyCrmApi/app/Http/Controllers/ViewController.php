<?php

namespace App\Http\Controllers;

use App\Models\ChatMessage;
use App\Models\JobApplication;
use App\Models\News;
use App\Models\Order;
use App\Models\Project;
use App\Models\View;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ViewController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public static function getViewableByClassName($viewable, $id) {
        $res = null;
        switch ($viewable) {
            case 'news':
                $res = News::findOrFail($id); break;
            case 'orders':
                $res = Order::findOrFail($id); break;
            case 'projects':
                $res = Project::findOrFail($id); break;
            case 'jobApplications':
                $res = JobApplication::findOrFail($id); break;
        }
        return $res;
    }

    public static function getUnwatched ($model, $user) {
        $countViewed = View::where('user_id', $user->id)
            ->hasMorph('viewable', [$model])
            ->count();
        $totalCount = $model::count();
        return $totalCount - $countViewed;
    }

    public static function setView($viewable, $user) {
        $view = new View();
        $view->viewable()->associate($viewable);
        $view->user()->associate($user);
        $view->save();
    }

    public static function deleteAllViews($viewable) {
         View::where('viewable_id', $viewable->id)
            ->where('viewable_type', get_class($viewable))
            ->delete();
    }


    public function getCounter(Request $request) {
        $user = Auth::user();

        $newMessagesCountQuery = ChatMessage::query();
        $newMessagesCountQuery->where('to_id', $user->id);
        $newMessagesCountQuery->where('isSeen', '0');

        $newChatMessages = $newMessagesCountQuery
            ->whereBetween('created_at', [$user->created_at, Carbon::now()])
            ->count();

        $newNews = ViewController::getUnwatched(News::class, $user);
        $newOrders = ViewController::getUnwatched(Order::class, $user);
        $newProjects = ViewController::getUnwatched(Project::class, $user);
        $newJobApplications = ViewController::getUnwatched(JobApplication::class, $user);

        return response()->json(compact(
    'newNews',
    'newOrders',
             'newProjects',
             'newJobApplications',
             'newChatMessages'
        ));
    }

    public function markNewsAsSeen(Request $request, $viewable) {
        $user = Auth::user();
        $ids = $request->input('ids');

        foreach ($ids as $id) {
            $viewableModel = ViewController::getViewableByClassName($viewable, $id);
            $exist = View::where('user_id', $user->id)
                ->where('viewable_id', $viewableModel->id)
                ->where('viewable_type', get_class($viewableModel))
                ->first();

            // skip if view already exist
            if($exist) continue;
            ViewController::setView($viewableModel, $user);
        }

        return response()->json(['message' =>'Ok']);
    }


}
