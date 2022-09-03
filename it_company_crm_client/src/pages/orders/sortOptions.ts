import {SortOrderOptionType} from "../../types/global";


const defOrderSortOrderData : SortOrderOptionType[] = [

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
        value: 'status',
        order: 'asc',
        name: 'Статусу',
        selected: false
    },
    {
        id: 4,
        value: 'member_count',
        order: 'desc',
        name: 'Статусу',
        selected: false
    },

    {
        id: 5,
        value: 'project.deadline',
        order: 'asc',
        name: 'Крайний срок',
        selected: false
    },
    {
        id: 6,
        value: 'project.deadline',
        order: 'desc',
        name: 'Крайний срок',
        selected: false
    }
];

export const getSortOrderOptionValue = (option: SortOrderOptionType) => {
    return `${option.name} ${option.order === 'desc' ? '(по убыванию)' : '(по возрастанию)'}`
}

export default defOrderSortOrderData;
