import {SortOrderOptionType} from "../../types/global";


const defJobApplicationSortOrderData : SortOrderOptionType[] = [

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
        name: 'Статус',
        selected: false
    },
    {
        id: 4,
        value: 'status',
        order: 'desc',
        name: 'Статус',
        selected: false
    },

    {
        id: 5,
        value: 'vacancy',
        order: 'asc',
        name: 'Вакансия',
        selected: false
    },
    {
        id: 6,
        value: 'vacancy',
        order: 'desc',
        name: 'Вакансия',
        selected: false
    }
];

export const getSortOrderOptionValue = (option: SortOrderOptionType) => {
    return `${option.name} ${option.order === 'desc' ? '(по убыванию)' : '(по возрастанию)'}`
}



export default defJobApplicationSortOrderData;
