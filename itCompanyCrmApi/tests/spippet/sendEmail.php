\/*
public function index() {
$to = User::findOrFail(1);
$someData = [ 'hello' => 'hello world message '];
//
Notification::send($to, new HelloNot($someData));
/*
//
//        Mail::to('jeka.rubchuk@yahoo.com')
//            ->send(new HelloMail());

//        $user = User::findOrFail(1);
//
//        return response()->json($user->roles()->get(), 201);
*/
