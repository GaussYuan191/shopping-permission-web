<template>
    <div class="addProduct">
        <el-card class="operate-container" shadow="never">
            <i class="el-icon-tickets"></i>
            <span>添加商品</span>
        </el-card>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="商品的名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="商品的品牌" prop="brandName">
                <el-input v-model="ruleForm.brandName"></el-input>
            </el-form-item>
            <el-form-item label="商品的图片" prop="pic">
                <el-input v-model="ruleForm.pic"></el-input>
            </el-form-item>
            <el-form-item label="商品的价格" prop="price">
                <el-input v-model="ruleForm.price"></el-input>
            </el-form-item>
            <el-form-item label="商品的货号" prop="productSn">
                <el-input v-model="ruleForm.productSn"></el-input>
            </el-form-item>
            <el-form-item label="商品的数量" prop="nums">
                <el-input v-model="ruleForm.nums"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit('ruleForm')">添加</el-button>
                <el-button @click="resetForm('ruleForm')">取消</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
  import {addProduct} from '@/api/product'

  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          brandName: '',
          pic: '',
          price: '',
          productSn: '',
          nums: '',
          sale: 0,
          createTime: null,
        },
        rules: {
          name: [
            { required: true, message: '请输入商品的名称', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          brandName: [
            { required: true, message: '请输入商品的品牌', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          pic: [
            { required: true, message: '请输入商品的图片', trigger: 'blur' },
          ],
          price: [
            { required: true, message: '请输入商品的价格', trigger: 'blur' },
          ],
          productSn: [
            { required: true, message: '请输入商品的货号', trigger: 'blur' },

          ],
          nums: [
            { required: true, message: '请输入商品的数量', trigger: 'blur' },
          ]

        }
      };
    },
    methods: {
      onSubmit (formName) {
        let date1 = new Date()
        this.ruleForm.createTime = date1
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                addProduct(this.ruleForm).then(response => {
                  this.$message({
                    message: '添加成功',
                    type: 'success',
                    duration: 1000
                  })
                })
            })

          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration: 1000
            })
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
.operate-container {
    margin-bottom: 10px;
}
.demo-ruleForm {
    width: 400px;
    text-align: center;
    margin: 0 auto;
}
</style>
