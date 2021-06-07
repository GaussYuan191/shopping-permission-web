<template> 
    <div class="app-container">
        <el-card class="operate-container" shadow="never">
            <i class="el-icon-tickets"></i>
            <span>数据列表</span>
        </el-card>
        <div class="table-container">
            <el-table ref="orderTable"
                      :data="list"
                      style="width: 100%;"
                      @selection-change="handleSelectionChange"
                      v-loading="listLoading" border>
                <el-table-column type="selection" width="60" align="center"></el-table-column>
                <el-table-column label="编号" width="80" align="center">
                    <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column label="订单编号" width="180" align="center">
                    <template slot-scope="scope">{{scope.row.orderSn}}</template>
                </el-table-column>
                <el-table-column label="提交时间" width="180" align="center">
                    <template slot-scope="scope">{{scope.row.createTime | formatCreateTime}}</template>
                </el-table-column>
                <el-table-column label="用户账号" align="center">
                    <template slot-scope="scope">{{scope.row.memberUsername}}</template>
                </el-table-column>
                <el-table-column label="订单金额" width="120" align="center">
                    <template slot-scope="scope">￥{{scope.row.totalAmount}}</template>
                </el-table-column>
                <el-table-column label="支付方式" width="120" align="center">
                    <template slot-scope="scope">{{scope.row.payType | formatPayType}}</template>
                </el-table-column>
                <el-table-column label="订单来源" width="120" align="center">
                    <template slot-scope="scope">{{scope.row.sourceType | formatSourceType}}</template>
                </el-table-column>
                <el-table-column label="订单状态" width="120" align="center">
                    <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
                </el-table-column>
            </el-table>
        </div>



    </div>
</template>
<script>
  import {fetchList,closeOrder,deleteOrder} from '@/api/order'
  import {formatDate} from '@/utils/date';

  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    orderSn: null,
    receiverKeyword: null,
    status: null,
    orderType: null,
    sourceType: null,
    createTime: null,
  };
  export default {
    name: "orderList",
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        listLoading: true,
        list: null,
        total: null,
        operateType: null,
        multipleSelection: [],
        closeOrder:{
          dialogVisible:false,
          content:null,
          orderIds:[]
        },
        statusOptions: [
          {
            label: '待付款',
            value: 0
          },
          {
            label: '待发货',
            value: 1
          },
          {
            label: '已发货',
            value: 2
          },
          {
            label: '已完成',
            value: 3
          },
          {
            label: '已关闭',
            value: 4
          }
        ],
        orderTypeOptions: [
          {
            label: '正常订单',
            value: 0
          },
          {
            label: '秒杀订单',
            value: 1
          }
        ],
        sourceTypeOptions: [
          {
            label: 'PC订单',
            value: 0
          },
          {
            label: 'APP订单',
            value: 1
          }
        ],
        operateOptions: [
          {
            label: "批量发货",
            value: 1
          },
          {
            label: "关闭订单",
            value: 2
          },
          {
            label: "删除订单",
            value: 3
          }
        ],
      }
    },
    created() {
      this.getList();
    },
    filters: {
      formatCreateTime(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
      formatPayType(value) {
        if (value === 1) {
          return '支付宝';
        } else if (value === 2) {
          return '微信';
        } else {
          return '未支付';
        }
      },
      formatSourceType(value) {
        if (value === 1) {
          return 'APP订单';
        } else {
          return 'PC订单';
        }
      },
      formatStatus(value) {
        if (value === 1) {
          return '待发货';
        } else if (value === 2) {
          return '已发货';
        } else if (value === 3) {
          return '已完成';
        } else if (value === 4) {
          return '已关闭';
        } else if (value === 5) {
          return '无效订单';
        } else {
          return '待付款';
        }
      },
    },
    methods: {
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
      },




      handleSizeChange(val){
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },


      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        });
      }


    }
  }
</script>
<style scoped>
    .input-width {
        width: 203px;
    }
</style>


