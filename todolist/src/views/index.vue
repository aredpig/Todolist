<template>
  <div v-if="!showDetail">
      <ContentWrap>
        <!-- 搜索工作栏 -->
        <el-form class="-mb-15px" :model="queryParams" ref="queryFormRef" :inline="true" label-width="100px">
          <el-row>
            <el-col :span="6">
              <el-form-item label="案件编号" prop="caseNo" style="width: 100%">
                <el-input v-model="queryParams.caseNo" placeholder="请输入事件编号" clearable @keyup.enter="handleQuery" style="width: 80%"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="所属辖区" prop="areaStreetId" style="width: 100%">
                <el-tree-select v-model="queryParams.areaStreetId" :data="areaTableData" :props="areaProps"
                  check-strictly />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="纠纷类型" prop="caseType" style="width: 100%">
                <el-select v-model="queryParams.caseType" placeholder="请选择事件类型" clearable style="width: 80%">
                  <el-option v-for="dict in getIntDictOptions(DICT_TYPE.MT_CASE_TYPE)" :key="dict.value" :label="dict.label" :value="dict.value"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="发生时间" prop="occurTime" style="width: 86%">
                <el-date-picker v-model="queryParams.occurTime" value-format="YYYY-MM-DD" type="date" placeholder="选择发生时间" clearable style="width: 100%"/>
              </el-form-item>
            </el-col>
          </el-row>
          <div v-show="isExpand">
          <el-row>
            <el-col :span="6">
              <el-form-item label="案件来源" prop="initStatus" style="width: 100%">
                <el-select v-model="queryParams.initStatus" placeholder="请选择案件来源" clearable style="width: 80%">
                  <el-option v-for="dict in getIntDictOptions(DICT_TYPE.MT_CASE_INIT_FROM_TYPE)" :key="dict.value" :label="dict.label" :value="dict.value"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="难易程度" prop="difficultLevel" style="width: 100%">
                <el-select v-model="queryParams.difficultLevel" placeholder="请选择难易程度" clearable style="width: 100%">
                  <el-option v-for="dict in getIntDictOptions(DICT_TYPE.MT_CASE_DIFFICULT_LEVEL)" :key="dict.value" :label="dict.label" :value="dict.value"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="更新时间" prop="updateTime" style="width: 86%">
                <el-date-picker
                  v-model="queryParams.updateTime"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  :default-time="[new Date('1 00:00:00'), new Date('1 23:59:59')]"
                  type="daterange"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
        </el-row>
        </div>
          <el-row justify="end" style="margin-right: -30px;">
            <el-form-item>
              <el-button @click="handleQuery">
                <Icon icon="ep:search" class="mr-5px" /> 搜索
              </el-button>
              <el-button @click="resetQuery">
                <Icon icon="ep:refresh" class="mr-5px" /> 重置
              </el-button>
              <span class="isExpandBox" v-if="!isExpand" @click="isExpand=true">展开
                  <Icon :icon="'ep:arrow-down'" class="mr-5px isExpandIcon" :size="14" />
                </span>
              <span class="isExpandBox" v-if="isExpand" @click="isExpand=false">收起
                  <Icon :icon="'ep:arrow-up'" class="mr-5px isExpandIcon" :size="14" />
                </span>
            </el-form-item>
          </el-row>
        </el-form>
      </ContentWrap>

      <!-- 列表 -->
    <ContentWrap style="position: relative;">
      <el-tabs v-model="activeName" class="operation-tabs">
        <el-tab-pane v-if="currentPath === '/case-info/pending'" label="待受理" :name="TabName.TAB_ACCEPT_PENDING"/>
        <el-tab-pane v-if="currentPath === '/case-info/transfer'" label="转案件" :name="TabName.TAB_TRANSFOR" />
        <el-tab-pane v-if="currentPath === '/case-info/invalid'" label="无效案件" :name="TabName.TAB_INVALID" />
      </el-tabs>
      <div style="position: relative;">
          <el-table v-loading="loading" :data="list" :stripe="true" :show-overflow-tooltip="true" max-height="618">
               <el-table-column label="序号" min-width="60px" align="center" fixed="left">
           <template #default="scope">
             {{ scope.$index + 1 }}
           </template>
         </el-table-column>
         <el-table-column v-if="activeName === TabName.TAB_TRANSFOR" label="案件编号" align="center" prop="caseNo" fixed min-width="240px">
           <template #default="scope">
             <div style="cursor: pointer; font-size: 14px" @click="openForm('detail',  scope.row.id)" v-hasPermi="['mtiao:case-info:query']">
               <span style="color:#409EFF!important;border-bottom: 1px solid #409EFF;"> {{scope.row.caseNo}}</span>
             </div>
           </template>
         </el-table-column>
         <el-table-column label="所属辖区" align="center" prop="areaStreetId" :formatter="areaFormatter" min-width="120px"/>
         <el-table-column label="纠纷类型" align="center" prop="caseType" min-width="120px">
           <template #default="scope">
               <dict-tag :type="DICT_TYPE.MT_CASE_TYPE" :value="scope.row.caseType" />
           </template>
         </el-table-column>
         <el-table-column v-if="activeName !== TabName.TAB_TRANSFOR" label="纠纷简要描述" align="center" prop="caseDescribe" min-width="140px">
            <template #default="scope">
              <div style="cursor: pointer; font-size: 14px" @click="openForm('detail',  scope.row.id)" v-hasPermi="['mtiao:case-info:query']">
                <span style="color:#409EFF!important;border-bottom: 1px solid #409EFF;"> {{scope.row.caseDescribe}}</span>
              </div>
            </template>
         </el-table-column>
         <el-table-column v-else label="纠纷简要描述" align="center" prop="caseDescribe" min-width="140px" />
         <el-table-column label="来源部门" align="center" prop="sourceDeptName" min-width="140px"/>
         <el-table-column label="案件来源" align="center" prop="initStatus" min-width="120px">
           <template #default="scope">
               <dict-tag :type="DICT_TYPE.MT_CASE_INIT_FROM_TYPE" :value="scope.row.initStatus" />
           </template>
         </el-table-column>
         <el-table-column label="难易程度" align="center" prop="difficultLevel">
           <template #default="scope">
               <dict-tag :type="DICT_TYPE.MT_CASE_DIFFICULT_LEVEL" :value="scope.row.difficultLevel" />
           </template>
         </el-table-column>
         <el-table-column label="发生时间" align="center" prop="occurTime" :formatter="dateFormatter2" width="130px"/>
         <el-table-column label="更新时间" align="center" prop="updateTime" :formatter="dateFormatter2" width="130px"/>
            <el-table-column label="操作" align="center" min-width="140px" fixed="right" v-if="activeName !== TabName.TAB_TRANSFOR">
              <template #default="scope">
                <!-- <el-button link type="primary" v-if="activeName === TabName.TAB_ACCEPT_PENDING" @click="openForm('edit', scope.row.id)" v-hasPermi="['mtiao:case-info:update']">
                  <Icon icon="ep:edit" />编辑
                </el-button> -->
                <!-- 待受理状态 -->
                <el-button link type="primary" @click="openForm('update', scope.row.id)" v-hasPermi="['mtiao:case-info:reception']" v-if="activeName === TabName.TAB_ACCEPT_PENDING">
                  <Icon icon="ep:edit" />受理/无效
                </el-button>
                <!-- 无效状态 -->
                <el-button link type="primary" @click="handleCaseCloseWithdraw(scope.row.id)" v-hasPermi="['mtiao:case-info:reception']" v-if="activeName === TabName.TAB_INVALID">
                  <Icon icon="ep:edit" />撤回
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页 -->
        <Pagination :total="total" v-model:page="queryParams.pageNo" v-model:limit="queryParams.pageSize" @pagination="getList"/>
      </ContentWrap>
  </div>
  <!-- 表单弹窗：处理 -->
  <CaseInfoDisposeForm ref="formRef" :id="ids" :type="types" @success="getList" v-model:show-detail="showDetail" v-else/>
</template>

<script setup lang="ts">
import { getIntDictOptions, DICT_TYPE } from '@/utils/dict'
import { dateFormatter2 } from '@/utils/formatTime'
import { CaseInfoApi, CaseInfoVO } from '@/api/mtiao/caseinfo'
import CaseInfoDisposeForm from './CaseInfoDisposeForm.vue'
import { CaseType, AreaManagement, TabName, SubmissionType } from '@/types/caseInfoType'
import * as areaApi from '@/api/system/area'
const message = useMessage() // 消息弹窗

/** 路由控制逻辑 */
import { useRoute } from 'vue-router';

// 获取当前路由
const route = useRoute();
const currentPath = ref(route.path);

/** 案件件信息 列表 */
defineOptions({ name: 'CaseInfo' })

/** 撤回结案申请 */
const handleCaseCloseWithdraw = async (id: number) => {
  await message.confirm('请确认撤回无效案件')
  const params = {
    operateType: SubmissionType.SUBMISSION_INVALID_WITHDRAW,
    handleRemarks: '撤回无效案件',
    caseId: id
  }
  await CaseInfoApi.submitCaseWithdraw(params)
  message.success('无效案件撤回成功！')
  getList()
}

const loading = ref(true) // 列表的加载中
const list = ref<CaseInfoVO[]>([]) // 列表的数据
const total = ref(0) // 列表的总页数
const showDetail = ref(false)   // 是否显示详情页
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  caseNo: undefined,
  areaStreetId: undefined,
  caseType: undefined,
  occurTime: undefined as any,
  occurAddress: undefined,
  revisitStatus: undefined,
  transferType: undefined,
  difficultLevel: undefined,
  classicCase: undefined,
  status: undefined as any,
  deptId: undefined,
  caseFromType: undefined,
  sourceDeptName: undefined,
  initStatus: undefined,
  updateTime: undefined
})
const activeName = ref()
const isExpand = ref(false)
const queryFormRef = ref() // 搜索的表单

/** 地区的管理　*/
const areaTableData = ref([]) as any
const areaFormatter = (row, column, cellValue, index) => {
  // 定义递归函数
  const findNameByCode = (tree, code) => {
    for (const node of tree) {
      if (node.code === code) {
        return node.name
      }
      if (node.children && node.children.length > 0) {
        const name = findNameByCode(node.children, code)
        if (name) {
          return name
        }
      }
    }
    return null // 没找到返回 null
  }
/**
 * 
剣

あ行
	•	あ (あめ / ame) - 雨（雨）
	•	い (いぬ / inu) - 犬（狗）
	•	う (うみ / umi) - 海（海）
	•	え (えいが / eiga) - 映画（电影）
	•	お (おちゃ / ocha) - お茶（茶）

か行
	•	か (かさ / kasa) - 傘（伞）
	•	き (き / ki) - 木（树）
	•	く (くるま / kuruma) - 車（车）
	•	け (けん / ken) - 剣（剑）
	•	こ (こども / kodomo) - 子供（孩子）

さ行
	•	さ (さくら / sakura) - 桜（樱花）
	•	し (しお / shio) - 塩（盐）
	•	す (すいか / suika) - スイカ（西瓜）
	•	せ (せかい / sekai) - 世界（世界）
	•	そ (そら / sora) - 空（天空）

た行
	•	た (たまご / tamago) - 卵（鸡蛋）
	•	ち (ちず / chizu) - 地図（地图）
	•	つ (つき / tsuki) - 月（月亮）
	•	て (てがみ / tegami) - 手紙（信）
	•	と (ともだち / tomodachi) - 友達（朋友）

な行
	•	な (なつ / natsu) - 夏（夏天）
	•	に (にほん / nihon) - 日本（日本）
	•	ぬ (ぬの / nuno) - 布（布料）
	•	ね (ねこ / neko) - 猫（猫）
	•	の (のり / nori) - 海苔（海苔）

は行
	•	は (はな / hana) - 花（花）
	•	ひ (ひと / hito) - 人（人）
	•	ふ (ふゆ / fuyu) - 冬（冬天）
	•	へ (へや / heya) - 部屋（房间）
	•	ほ (ほし / hoshi) - 星（星星）

ま行
	•	ま (まち / machi) - 町（城镇）
	•	み (みず / mizu) - 水（水）
	•	む (むし / mushi) - 虫（虫子）
	•	め (めがね / megane) - 眼鏡（眼镜）
	•	も (もり / mori) - 森（森林）

や行
	•	や (やま / yama) - 山（山）
	•	ゆ (ゆき / yuki) - 雪（雪）
	•	よ (よる / yoru) - 夜（夜晚）

ら行
	•	ら (らいおん / raion) - ライオン（狮子）
	•	り (りんご / ringo) - りんご（苹果）
	•	る (るす / rusu) - 留守（不在家）
	•	れ (れい / rei) - 礼（礼节）
	•	ろ (ろく / roku) - 六（数字6）

わ行
	•	わ (わたし / watashi) - 私（我）
	•	を (を / o) - (多用于助词，单词中较少使用)
	•	ん (ほん / hon) - 本（书）

 * 
 */

  // 使用递归函数在树中查找
  const area = findNameByCode(areaTableData.value, cellValue)

  // 返回结果：找到返回名称，没找到返回原始值
  return area || cellValue
}
// 获取树形结构
const getArea = async (params?: any) => {
  try {
    //查地区
    const param = {
      maxType: AreaManagement.MAX_TYPE,
      minType: AreaManagement.MIN_TYPE,
      code: AreaManagement.CODE
    }
    const data = await areaApi.getStreetTreeList(param)
    areaTableData.value = data[0].children
  } finally {
  }
}
const areaProps = {
  children: 'children',
  label: 'name',
  value: 'code'
}

/** Tab页点击 */
const handleTabChange = () => {
  if (currentPath.value === '/case-info/pending') {
    activeName.value = TabName.TAB_ACCEPT_PENDING
    queryParams.status = CaseType.CASE_ACCEPT_PENDING //待受理
  } else if (currentPath.value === '/case-info/transfer') {
    activeName.value = TabName.TAB_TRANSFOR
    queryParams.status = CaseType.CASE_TRANSFOR //转案件
  } else if (currentPath.value === '/case-info/invalid') {
    activeName.value = TabName.TAB_INVALID
    queryParams.status = CaseType.CASE_INVALID //无效
  }
  getList()
}

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await CaseInfoApi.getCaseInfoPage(queryParams)
    list.value = data.list
    total.value = data.total
  } finally {
    loading.value = false
    showDetail.value = false
  }
}

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.pageNo = 1
  getList()
}

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value.resetFields()
  handleQuery()
}

/** 添加/修改操作 */
const formRef = ref()
const types = ref('')
const ids = ref()

const openForm = (type: string, id?: number) => {
  queryFormRef.value.resetFields()
  showDetail.value = true   //打开祥情页
  types.value = type
  ids.value = id
}

/** 初始化 **/
onMounted(() => {
  // getList()
  getArea()
  handleTabChange()
})
</script>