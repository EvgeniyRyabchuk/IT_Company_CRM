
// const [selectedCustomer, setSelectedCustomer] = useState<Customer>();
//
// const handleCreateEditRow = async (values: Customer, mode: string) => {
//     console.log('submit', values);
//     if(mode === 'create') {
//         const { data } = await CustomerService.createCustomer(values);
//         fetchCustomers();
//     }
//     else {
//         const { data } = await CustomerService.updateCustomer(values);
//         // update employee list
//         const newCustomers = customers.map((e: Customer) => e.id === data.id ? data : e);
//         setCustomers(newCustomers);
//     }
// };