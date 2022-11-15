// let y = 20;
// customers.forEach((e) => {
//     const full_name = e.user.full_name;
//     const email = e.user.email;
//     const phones = e.user.phones.map(phone =>`${phone.phone_number}`).join(' ');
//     const created_at = e.user.created_at;

//     const row = `Full Name: ${full_name} | Email: ${email} | Phones: ${phones} | Created At: ${created_at}`;

//     report.text(row,20, y);
//     // report.setLineWidth(0.5)
//     // report.line(20, y, 20, y)
//     y += 100;
// })
//     report.save('report.pdf');