import {SortOrderOptionType} from "../../types/global";


const defProjectSortOrderData : SortOrderOptionType[] = [

    {
        id: 1,
        name: 'Дата',
        value: 'created_at',
        order: 'asc',
        selected: true
    },
    {
        id: 2,
        name: 'Дата',
        value: 'created_at',
        order: 'desc',
        selected: false
    },

    {
        id: 3,
        value: 'member_count',
        order: 'asc',
        name: 'Количество участников',
        selected: false
    },
    {
        id: 4,
        value: 'member_count',
        order: 'desc',
        name: 'Количество участников',
        selected: false
    },

    {
        id: 5,
        value: 'deadline',
        order: 'asc',
        name: 'Крайний срок',
        selected: false
    },
    {
        id: 6,
        value: 'deadline',
        order: 'desc',
        name: 'Крайний срок',
        selected: false
    }
];

export const getSortOrderOptionValue = (option: SortOrderOptionType) => {
    return `${option.name} ${option.order === 'desc' ? '(по убыванию)' : '(по возрастанию)'}`
}



export default defProjectSortOrderData;
