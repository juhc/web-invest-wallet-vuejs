<template>
  <section>
    <span class="top-shares-header">Топ-5 по доходности</span>
    <div class="top-shares">
      <Doughnut class="chart-doughnut" :data="data" :options="options" />
      <div class="shares">
        <div v-for="share in topShares" class="share">
          <div class="share-color" :style="{ 'background-color': share.color }"></div>
          <div class="share-text">{{ share.label }}: <span class="percent">{{ share.value }}%</span></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  components: {
    Doughnut
  },
  props: {
    data: {
      type: Object
    },
    topShares: {
      type: Object
    }
  },
  data() {
    return {
      options: {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
            position: 'bottom',
          }
        },
        borderColor: '#19191d',
        borderWidth: 7,
        borderRadius: 10,
        hoverBorderWidth: 3,
      }
    }
  }
}
</script>

<style scoped>
@media (min-width: 1280px) {
  main {
    max-width: 1280px;
    justify-content: center;
  }

  .top-shares {
    align-items: center;
    column-gap: 35px;
    padding: 15px 25px;
    border-radius: 20px;
    transition: box-shadow 0.5s, scale 0.5s;
  }

  .top-shares:hover {
    box-shadow: 0px 4px 12px -2px #41B883;
    scale: 1.05;
  }

  .top-shares-header {
    font-size: 24px;
  }

  .chart-doughnut {
    width: 250px;
    height: auto;
  }
}

@media (max-width: 480px) {
  .top-shares {
    display: flex;
    flex-direction: column;
    column-gap: 35px;
    margin-top: 25px;
  }

  .shares {
    margin: 0 auto;
    margin-top: 25px;
  }

  .chart-doughnut {
    width: 250px;
    height: 250px;
    margin: auto;
  }

  .top-shares-header {
    font-size: 20px;
  }
}

section {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.top-shares {
  display: flex;
  border-radius: 20px;
  transition: box-shadow 0.5s, scale 0.5s;
  margin-top: 25px;
}

.shares {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}

.share {
  font-size: 16px;
  display: flex;
  column-gap: 14px;
  align-items: center;
}

.share-color {
  min-width: 14px;
  min-height: 10px;
}

.percent {
  color: #41B883;
  font-weight: bold;
  font-family: 'Roboto Mono';
}
</style>