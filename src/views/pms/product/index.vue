<template> 
    <div class="app-container">
        <el-card class="operate-container" shadow="never">
            <i class="el-icon-tickets"></i>
            <span>数据列表</span>
        </el-card>
        <div class="table-container">
            <el-table ref="productTable"
                      :data="list"
                      style="width: 100%"
                      @selection-change="handleSelectionChange"
                      v-loading="listLoading"
                      border>
                <el-table-column type="selection" width="60" align="center"></el-table-column>
                <el-table-column label="编号" width="160" align="center">
                    <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column label="商品图片" width="160" align="center">
                    <template slot-scope="scope"><img style="height: 80px" :src="scope.row.pic"></template>
                </el-table-column>
                <el-table-column label="商品名称" width="160" align="center">
                    <template slot-scope="scope">{{scope.row.name}}</template>
                </el-table-column>
                <el-table-column label="品牌" width="160" align="center">
                    <template slot-scope="scope">{{scope.row.brandName}}</template>
                </el-table-column>
                <el-table-column label="价格" width="160" align="center">
                    <template slot-scope="scope">价格：￥{{scope.row.price}}</template>
                </el-table-column>
                <el-table-column label="货号" width="160" align="center">
                    <template slot-scope="scope">{{scope.row.productSn}}</template>
                </el-table-column>

                <el-table-column label="销量" width="160" align="center">
                    <template slot-scope="scope">{{scope.row.sale}}</template>
                </el-table-column>
                <el-table-column label="上架时间" width="200" align="center">
                    <template slot-scope="scope">{{scope.row.createTime | formatCreateTime()}}</template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
  import { fetchList } from '@/api/product'
  import {formatDate} from '@/utils/date';

  const defaultListQuery = {
    keyword: null,
    pageNum: 1,
    pageSize: 5,
    publishStatus: null,
    verifyStatus: null,
    productSn: null,
    productCategoryId: null,
    brandId: null
  };
  export default {
    name: "productList",
    data() {
      return {
        editSkuInfo:{
          dialogVisible:false,
          productId:null,
          productSn:'',
          productAttributeCategoryId:null,
          stockList:[],
          productAttr:[],
          keyword:null
        },
        operateType: null,
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: true,
        selectProductCateValue: null,
        multipleSelection: [],
        productCateOptions: [],
        brandOptions: [],
        createTime: null,

      }
    },
    created() {
      this.getList();
    },
    watch: {
    },
    filters: {
      formatCreateTime(time) {
        let date = new Date(time);
        console.log('s',time)
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }

    },
    methods: {

      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data;
          this.total = response.data;
          console.log('aa',this.list[0].createTime)
        });

      },

      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }


    }
  }
</script>
<style></style>


