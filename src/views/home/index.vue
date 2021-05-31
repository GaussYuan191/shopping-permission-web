<template>
    <div class="app-container">
        这是主页
    </div>
</template>

<script>
  import { str2Date } from '@/utils/date'
  import img_home_order from '@/assets/images/home_order.png'
  import img_home_today_amount from '@/assets/images/home_today_amount.png'
  import img_home_yesterday_amount from '@/assets/images/home_yesterday_amount.png'

  export default {
    name: 'home',
    data () {
      return {
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              let start = new Date()
              start.setFullYear(2018)
              start.setMonth(10)
              start.setDate(1)
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一月',
            onClick (picker) {
              const end = new Date()
              let start = new Date()
              start.setFullYear(2018)
              start.setMonth(10)
              start.setDate(1)
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        orderCountDate: '',
        chartSettings: {
          xAxisType: 'time',
          area: true,
          axisSite: { right: ['orderAmount'] },
          labelMap: { 'orderCount': '订单数量', 'orderAmount': '订单金额' }
        },
        chartData: {
          columns: [],
          rows: []
        },
        loading: false,
        dataEmpty: false,
        img_home_order,
        img_home_today_amount,
        img_home_yesterday_amount
      }
    },
    created () {
      this.initOrderCountDate()
      this.getData()
    },
    methods: {
      handleDateChange () {
        this.getData()
      },
      initOrderCountDate () {
        let start = new Date()
        start.setFullYear(2018)
        start.setMonth(10)
        start.setDate(1)
        const end = new Date()
        end.setTime(start.getTime() + 1000 * 60 * 60 * 24 * 7)
        this.orderCountDate = [start, end]
      },
      getData () {
        setTimeout(() => {
          this.chartData = {
            columns: ['date', 'orderCount', 'orderAmount'],
            rows: []
          }
          for (let i = 0; i < DATA_FROM_BACKEND.rows.length; i++) {
            let item = DATA_FROM_BACKEND.rows[i]
            let currDate = str2Date(item.date)
            let start = this.orderCountDate[0]
            let end = this.orderCountDate[1]
            if (currDate.getTime() >= start.getTime() && currDate.getTime() <= end.getTime()) {
              this.chartData.rows.push(item)
            }
          }
          this.dataEmpty = false
          this.loading = false
        }, 1000)
      }
    }
  }
</script>

<style scoped>
    .app-container {
        margin-top: 40px;
        margin-left: 120px;
        margin-right: 120px;
    }

    .address-layout {
    }

    .total-layout {
        margin-top: 20px;
    }

    .total-frame {
        border: 1px solid #DCDFE6;
        padding: 20px;
        height: 100px;
    }

    .total-icon {
        color: #409EFF;
        width: 60px;
        height: 60px;
    }

    .total-title {
        position: relative;
        font-size: 16px;
        color: #909399;
        left: 70px;
        top: -50px;
    }

    .total-value {
        position: relative;
        font-size: 18px;
        color: #606266;
        left: 70px;
        top: -40px;
    }

    .un-handle-layout {
        margin-top: 20px;
        border: 1px solid #DCDFE6;
    }

    .layout-title {
        color: #606266;
        padding: 15px 20px;
        background: #F2F6FC;
        font-weight: bold;
    }

    .un-handle-content {
        padding: 20px 40px;
    }

    .un-handle-item {
        border-bottom: 1px solid #EBEEF5;
        padding: 10px;
    }

    .overview-layout {
        margin-top: 20px;
    }

    .overview-item-value {
        font-size: 24px;
        text-align: center;
    }

    .overview-item-title {
        margin-top: 10px;
        text-align: center;
    }

    .out-border {
        border: 1px solid #DCDFE6;
    }

    .statistics-layout {
        margin-top: 20px;
        border: 1px solid #DCDFE6;
    }

    .mine-layout {
        position: absolute;
        right: 140px;
        top: 107px;
        width: 250px;
        height: 235px;
    }

    .address-content {
        padding: 20px;
        font-size: 18px
    }
</style>
