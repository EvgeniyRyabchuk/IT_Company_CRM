// export const authRoles = {
//     sa: ['SA'], // Only Super Admin has access
//     admin: ['SA', 'ADMIN'], // Only SA & Admin has access
//     editor: ['SA', 'ADMIN', 'EDITOR'], // Only SA & Admin & Editor has access
//     guest: ['SA', 'ADMIN', 'EDITOR', 'GUEST'], // Everyone has access
// }


export const authRoles = {
    sa: ['admin'],
    admin: ['admin'],
    editor: ['manager', 'admin'],
    employee: ['developer', 'manager', 'admin'],
    all: ['customer', 'developer', 'manager', 'admin'],
}

