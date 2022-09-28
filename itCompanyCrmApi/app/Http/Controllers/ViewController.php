<?php

namespace App\Http\Controllers;

use App\Models\ChatMessage;
use App\Models\News;
use App\Models\View;
use Carbon\Carbon;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ViewController extends Controller
{
//    public function getNewsNotViewedCount(Request $request) {
//        $user = Auth::user();
//        $countViewed = View::where('user_id', $user->id)
//            ->hasMorph('viewable', [News::class])
//            ->count();
//        $totalCount = News::count();
//
//        $countNotViewed = $totalCount - $countViewed;
//
//        return response()->json($countNotViewed);
//    }

    private function getViewable($viewable, $id) {
        switch ($viewable) {
            case 'news':
                $viewable = News::findOrFail($id);
                return $viewable;
        }

    }

    public function getCounter(Request $request) {
        $user = Auth::user();
        $countViewed = View::where('user_id', $user->id)
            ->hasMorph('viewable', [News::class])
            ->count();
        $totalCount = News::count();


        $newMessagesCountQuery = ChatMessage::query();
        $newMessagesCountQuery->where('to_id', $user->id);
        $newMessagesCountQuery->where('isSeen', '0');

        $newChatMessages = $newMessagesCountQuery
            ->whereBetween('created_at', [$user->created_at, Carbon::now()])
            ->count();
        $newNews = $totalCount - $countViewed;

        return response()->json(compact('newNews', 'newChatMessages'));
    }

    public function markNewsAsSeen(Request $request, $viewable) {
        $user = Auth::user();
        $ids = $request->input('ids');

        foreach ($ids as $id) {
            $viewable = $this->getViewable($viewable, $id);
            $exist = View::where('user_id', $user->id)
                ->where('viewable_id', $viewable->id)
                ->where('viewable_type', get_class($viewable))
                ->first();
//            dd($exist);
            // skip already exist view
            if($exist) continue;

            $view = new View();
            $view->viewable()->associate($viewable);
            $view->user()->associate($user);
            $view->save();
        }

        return response()->json(['message' => 'Ok']);
    }
}
