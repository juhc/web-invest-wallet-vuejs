<template>
    <main>
        <div v-if="isLoadingPage">
            <LoadingAnimation></LoadingAnimation>
        </div>
        <div v-else-if="isFetchError" class="fetch-error">
            <div class="server-error"></div>
            <span>Потеряна связь с сервером. Попробуйте перезагрузить страницу.</span>
        </div>
        <div v-else>
            <div class="general-information">
                <ChartDoughnut :data="getDataset" :topShares="getTopPrecent" class="chart-doughnut"></ChartDoughnut>
                <div class="general-totals">
                    <div class="totals-text"><span class="totals-header">Общий доход:</span>
                        <Transition mode="out-in" name="total">
                            <span id="totalProfit" class="totals-sum" :key="totalProfit"
                                :class="[this.totalProfit > 0 ? 'profit-color' : 'disprofit-color']">
                                {{ commaSeparateNumber(this.totalProfit) }} ₽
                            </span>
                        </Transition>
                    </div>
                    <div class="totals-text"><span class="totals-header">Общая стоимость портфеля:</span>
                        <Transition mode="out-in" name="total">
                            <span id="totalSum" class="totals-sum" :key="totalSellSum">{{
                                commaSeparateNumber(this.totalSellSum)
                            }} ₽</span>
                        </Transition>
                    </div>
                </div>
            </div>
            <Table :shares="sortedShares" class="table-shares" v-model="selectedSort"></Table>
        </div>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Table from '@/components/Table.vue'
import ChartDoughnut from '@/components/ChartDoughnut.vue'
import LoadingAnimation from '@/components/UI/LoadingAnimation.vue'

export default defineComponent({
    components: {
        Table,
        ChartDoughnut,
        LoadingAnimation
    },
    mounted() {
        let fetchShares = this.fetchShares;
        fetchShares();

        let timer = setTimeout(function tick() {
            fetchShares();
            timer = setTimeout(tick, 20000);
        }, 5000)
    },
    data() {
        return {
            shares: [],
            isLoadingShares: false,
            isFetchError: false,
            isLoadingPage: true,
            selectedSort: '',
            totalProfit: 0,
            totalSellSum: 0,
        }
    },
    methods: {
        async fetchShares() {
            this.isLoadingShares = true;
            let url = 'http://' + window.location.hostname + ':5000/api/get-shares';
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.shares = JSON.parse(data);
                })
                .catch((error) => {
                    this.isFetchError = true;
                })
                .finally(() => {
                    this.isLoadingShares = false;
                    if (this.isLoadingPage) this.isLoadingPage = false;
                });
        },
        commaSeparateNumber(val) {
            var sign = 1;
            if (val < 0) {
                sign = -1;
                val = -val;
            }

            let num = val.toString().includes('.') ? val.toString().split('.')[0] : val.toString();

            while (/(\d+)(\d{3})/.test(num.toString())) {
                num = num.toString().replace(/(\d+)(\d{3})/, '$1' + ' ' + '$2');
            }

            if (val.toString().includes('.')) {
                num = num + '.' + val.toString().split('.')[1];
            }

            return sign < 0 ? '-' + num : num;
        }

    },
    watch: {
        shares(newValue) {
            this.totalProfit = this.shares.reduce((acc, curr) => acc + curr.expected_yield, 0).toFixed(2);
            this.totalSellSum = this.shares.reduce((acc, curr) => acc + curr.sell_sum, 0).toFixed(2);
        }
    },
    computed: {
        getDataset() {
            let selection = this.shares.sort((a, b) => b.expected_yield - a.expected_yield).slice(0, 5);
            let others = this.shares.sort((a, b) => b.expected_yield - a.expected_yield).slice(5, this.shares.length);
            let labels = selection.map(item => item.name);
            labels.push('Остальные');
            let expected_yield = selection.map(item => item.expected_yield);
            expected_yield.push(others.reduce((acc, curr) => acc + curr.expected_yield, 0));
            let data = {
                labels: labels,
                datasets: [
                    {
                        backgroundColor: ['#41B883', '#478A6C', '#15784B', '#B5F37D', '#81AD59', '#55961A'],
                        data: expected_yield
                    }
                ]
            }

            return data
        },
        getTopPrecent() {
            let data = this.getDataset;
            let result = [];
            let precent = this.totalProfit / 100;

            for (let i = 0; i < data.labels.length; i++) {
                result.push({
                    label: data.labels[i],
                    color: data.datasets[0].backgroundColor[i],
                    value: (data.datasets[0].data[i] / precent).toFixed(2)
                })
            }

            return result
        },
        sortedShares() {
            if (this.selectedSort[0] === '_') {
                let selectedSort = this.selectedSort.slice(1, this.selectedSort.length);
                if (selectedSort === 'name') {
                    return [...this.shares].sort((share1, share2) => share2[selectedSort]?.localeCompare(share1[selectedSort]))
                }
                else {
                    return [...this.shares].sort((share1, share2) => share2[selectedSort] - share1[selectedSort])
                }
            }
            else {
                if (this.selectedSort === 'name') {
                    return [...this.shares].sort((share1, share2) => share1[this.selectedSort]?.localeCompare(share2[this.selectedSort]))
                }
                else {
                    return [...this.shares].sort((share1, share2) => share1[this.selectedSort] - share2[this.selectedSort])
                }
            }
        }
    },
})
</script>

<style scoped>
@media (min-width: 1280px) {
    main {
        max-width: 1280px;
        justify-content: center;
    }

    .general-information {
        grid-template-columns: 3fr 1fr;
    }

    .general-totals {
        grid-row: 1;
        grid-column: end;
        align-items: end;
    }

    .totals-text {
        font-size: 24px;
    }

    .totals-sum {
        margin-left: 5px;
    }

    .fetch-error span {
        font-size: 24px;
    }
}

@media (max-width: 480px) {
    main {
        max-width: 320px;
    }
    .general-information {
        grid: 200px 650px / 1fr;
    }

    .general-totals {
        grid-row: 1;
    }

    .chart-doughnut {
        grid-row: 2;
        margin-top: 45px;
    }

    .totals-text {
        font-size: 24px;
        border: 2px solid #41b88332;
        border-radius: 10px;
        display: grid;
        min-width: 320px;
        grid-template-rows: 25px 30px;
        padding: 10px;
    }

    .totals-header {
        font-size: 16px;
    }

    .totals-sum {
        background-color: #41b88332;
        padding: 0 5px;
    }

    .totals-text {
        font-size: 20px;
    }

    .fetch-error span {
        text-align: center;
        font-size: 20px;
    }
    
    .table-shares {
        position: absolute;
        left: 0;
        right: 0;
    }
}

main {
    display: flex;
    margin: 25px auto;
    width: 100%;
}

.general-information {
    display: grid;
}

.general-totals {
    margin: auto;
    display: flex;
    flex-direction: column;
    row-gap: 25px;
}

.table-shares {
    margin-top: 25px;
}

.chart-doughnut {
    width: 100%;
}

.totals-sum {
    color: #41B883;
    font-family: 'Roboto Mono';
}

.total-enter-active {
    transition: opacity 500ms ease-in-out;
}

.total-leave-active {
    transition: opacity 425ms ease-in-out;
}

.total-enter,
.total-leave-to {
    opacity: 0;
}

.server-error {
    background-image: url('../assets/404.png');
    width: 256px;
    height: 256px;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: gray;
}

.fetch-error {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.fetch-error span {
    margin-top: 25px;
}
</style>
