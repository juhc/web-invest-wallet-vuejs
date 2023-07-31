<template>
    <div class="table">
        <table>
            <thead>
                <tr>
                    <td>
                        <span @click="changeSort('name')"
                            :class="[modelValue === 'name' ? 'up-sort' : modelValue === '_name' ? 'down-sort' : '']">Название</span>
                    </td>
                    <td>
                        <span @click="changeSort('average_buy_price')"
                            :class="[modelValue === 'average_buy_price' ? 'up-sort' : modelValue === '_average_buy_price' ? 'down-sort' : '']">Средняя
                            цена покупки, ₽</span>
                    </td>
                    <td>
                        <span @click="changeSort('quantity')"
                            :class="[modelValue === 'quantity' ? 'up-sort' : modelValue === '_quantity' ? 'down-sort' : '']">Количество</span>
                    </td>
                    <td>
                        <span @click="changeSort('sell_sum')"
                            :class="[modelValue === 'sell_sum' ? 'up-sort' : modelValue === '_sell_sum' ? 'down-sort' : '']">Сумма
                            продажи, ₽</span>
                    </td>
                    <td>
                        <span @click="changeSort('expected_yield')"
                            :class="[modelValue === 'expected_yield' ? 'up-sort' : modelValue === '_expected_yield' ? 'down-sort' : '']">Доходность,
                            ₽</span>
                    </td>
                    <td>
                        <span @click="changeSort('percent_yield')"
                            :class="[modelValue === 'percent_yield' ? 'up-sort' : modelValue === '_percent_yield' ? 'down-sort' : '']">Доходность,
                            %</span>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="share in shares" :key="share.name">
                    <td class="table_share-name">{{ share.name }}</td>
                    <td class="font-family-roboto-mono">{{ share.average_buy_price.toFixed(2) }}</td>
                    <td class="font-family-roboto-mono">{{ share.quantity }}</td>
                    <td class="font-family-roboto-mono">{{ share.sell_sum.toFixed(2) }}</td>
                    <td class="font-family-roboto-mono"
                        :class="[share.expected_yield >= 0 ? 'profit-color' : 'disprofit-color']">{{
                            share.expected_yield.toFixed(2) }}</td>
                    <td class="font-family-roboto-mono"
                        :class="[share.percent_yield >= 0 ? 'profit-color' : 'disprofit-color']">{{
                            share.percent_yield.toFixed(2) }}%</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        shares: {
            type: Array,
            required: true
        },
        modelValue: {
            type: String,
            default: 'expected_yield'
        }
    },
    methods: {
        changeSort(value) {
            if (this.modelValue === value) {
                value = '_' + value
            }
            this.$emit('update:modelValue', value)
        }
    }
}
</script>

<style scoped>
@media (min-width: 1280px) {
    thead td {
        padding: 20px 12px;
    }

    tbody td {
        padding: 12px;
    }

    table {
        table-layout: fixed;
    }

    .up-sort::after {
        content: '▲';
        margin-left: 10px;
        font-size: 14px;
    }

    .down-sort::after {
        content: '▼';
        margin-left: 10px;
        font-size: 14px;
    }
}

@media (max-width: 480px) {
    thead td {
        padding: 8px;
    }

    table {
        font-size: 12px;
        width: 100%;
    }

    tbody td {
        padding: 8px;
    }

    .up-sort::after {
        content: '▲';
        margin-left: 4px;
        font-size: 10px;
    }

    .down-sort::after {
        content: '▼';
        margin-left: 4px;
        font-size: 10px;
    }

    .table {
        overflow-x: scroll;
        width: 100%;
    }
}

table {
    border-collapse: collapse;
    border-spacing: 2px;
    width: 100%;
}

thead {
    background-color: #19191d;
}

thead td {
    font-weight: 700;
}

tbody tr {
    background-color: #212529;
    border-bottom: 5px solid #19191d;
    font-weight: 400;
    color: #777;
    transition: background-color 0.5s, color 0.5s;
}

tbody tr:hover {
    background-color: #2e2e36;
    color: white
}

tbody tr:hover .table_share-name {
    color: white;
}

.table_share-name {
    color: #b3b3b3;
    transition: color 0.5s;
}

thead td span {
    transition: color 0.25s;
}

thead td span:hover {
    color: #41B883;
    cursor: pointer;
}

.up-sort::after {
    content: '▲';
}

.down-sort::after {
    content: '▼';
}

.font-family-roboto-mono {
    font-family: 'Roboto Mono';
}
</style>
