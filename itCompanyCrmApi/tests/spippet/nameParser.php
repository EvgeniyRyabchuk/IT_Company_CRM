/*

$fullNameArr = explode(' ', $contact->name);
$user = User::create([
'first_name' => $fullNameArr[0],
'last_name' =>$fullNameArr[1] ?? '',
'middle_name' => $fullNameArr[2] ?? '',
'full_name' =>  $contact->name,
'email' => $contact->email,
'password' => Hash::make($randPassword),
]);

*/
