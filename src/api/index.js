import ajax from './ajax'
const BASE_URL = ''
const Medical = ''
// const BASE_URL = 'https://ossnew2.xlxt.net' 
// const Medical = 'https://api.xlxt.net/ossnew'

// -----医药大全------获取药品
export const GetClassifies = (params) => ajax(Medical + '/Medical/GetClassifies', params)
// -----医药大全------获取药品详情
export const GetMedicalDetail = (params) => ajax(Medical + '/Medical/GetMedicalDetail', params)
// -----医药大全------添加、编辑药品
export const AddMedicalNew = (params) => ajax(Medical + '/Medical/AddMedicalNew', params, 'POST')
// -----医药大全------视频凭证
export const CreateUploadVideo = () => ajax(Medical + '/Medical/CreateUploadVideo')
// -----医药大全------删除药品
export const DeleteMedical = (params) => ajax(Medical + '/Medical/DeleteMedical', params)
// ----医药大全-删除分类----
export const DeleteClassify = (params) => ajax(Medical + '/Medical/DeleteClassify', params)
// ----医药大全-添加分类----
export const AddClassify = (params) => ajax(Medical + '/Medical/AddClassify', params, 'POST')
// ----医药大全-获取
export const GetMedicals = (params) => ajax(Medical + '/Medical/GetMedicals', params)
// ----医药大全-获取用法用量
export const GetImgs = (params) => ajax(Medical + '/Medical/GetImgs', params)
// ----医药大全-添加用法用量
export const AddImg = (params) => ajax(Medical + '/Medical/AddImg', params, 'POST')
// ----医药大全-删除用法用量
export const DeleteImg = (params) => ajax(Medical + '/Medical/DeleteImg', params)
// ------------------------------------------------------------------------
// 添加人员
export const AddMember = (params) => ajax(BASE_URL + '/Member/AddMember', params, 'POST')
// 查询人员
export const GetMemberInfo = (params) => ajax(BASE_URL + '/Member/GetMemberInfo', params)
// 编辑人员
export const UptMember = (params) => ajax(BASE_URL + '/Member/UptMember', params)
// 人员反填接口
export const GetMemberByID = (params) => ajax(BASE_URL + '/Member/GetMemberByID', params)
// 修改人员状态
export const editState = (params) => ajax(BASE_URL + '/Member/ChangeState', params)
// 重置密码
export const ChangePwd = (params) => ajax(BASE_URL + '/Member/ChangePwd', params, 'POST')
// 删除人员
export const DelMember = (params) => ajax(BASE_URL + '/Member/DelMember', params)
// -------------------------------------------------------------------------
// 添加部门
export const AddDepartment = (params) => ajax(BASE_URL + '/Department/AddDepartment', params)
// 查询部门
export const GetAllDepartment = () => ajax(BASE_URL + '/Department/GetAllDepartment')
// 编辑部门
export const UptDepartment = (params) => ajax(BASE_URL + '/Department/UptDepartment', params)
// 删除部门
export const DelDepartment = (params) => ajax(BASE_URL + '/Department/DelDepartment', params)
// ------------------------------------标签-----------------------------------------
// 添加课程标签
export const addCourseTag = (params) => ajax(BASE_URL + '/Course/AddCourseTag', params)
// 查询标签
export const GetCourseTagInfo = (params) => ajax(BASE_URL + '/Course/GetCourseTagInfo', params)
// 编辑标签
export const UpdateCourseTag = (params) => ajax(BASE_URL + '/Course/UptCourseTag', params)
// 删除标签
export const DelCourseTag = (params) => ajax(BASE_URL + '/Course/DelCourseTag', params)
// 更改标签状态
export const SetTagSet = (params) => ajax(BASE_URL + '/Course/IsEnableTag', params)
// -----------------------------------标签绑定课程-----------------------------------
// 已绑定课程
export const GetBindCourse = (params) => ajax(BASE_URL + '/Course/GetBindCourse', params)
// 未绑定课程
export const GetUnB1indCourse = (params) => ajax(BASE_URL + '/Course/GetUnB1indCourse', params)
// 删除课程
export const DelBindCourse = (params) => ajax(BASE_URL + '/Course/DelBindCourse', params)
// 标签绑定课程
export const BindCourse = (params) => ajax(BASE_URL + '/Course/BindCourse', params)
// 标签绑定课程排序
export const OrderByCourse = (params) => ajax(BASE_URL + '/Course/OrderByCourse', params)
// -----------------------------------课程分类管理-----------------------------------
// 获取课程分类
export const GetAllClass = (params) => ajax(BASE_URL + '/Course/GetAllClassify', params)
// 添加课程分类
export const SetAddClass = (params) => ajax(BASE_URL + '/Course/AddCourseType', params)
// 删除课程分类
export const SetDelClass = (params) => ajax(BASE_URL + '/Course/DeleteClassify', params)
// 更新课程分类
export const UpdateClass = (params) => ajax(BASE_URL + '/Course/UpdateClassify', params)
// -----------------------------------企业课程管理-----------------------------------
// 企业课程列表
export const GetEnterPriseCourse = (params) => ajax(BASE_URL + '/Course/GetEnterPriseCourse', params)
// 修改企业课程状态
export const UpdateCourseAudit = (params) => ajax(BASE_URL + '/Course/UpdateCourseAudit', params)
// 企业课程视频
export const GetVideoUrl = (params) => ajax(BASE_URL + '/Course/GetVideoUrl', params)
// -----------------------------------课程商课程-------------------------------------
// 课程商课程列表
export const GetShopCourse = (params) => ajax(BASE_URL + '/Course/GetShopCourse', params)
// 课程反填分类
export const GetCourseByID = (params) => ajax(BASE_URL + '/Course/GetCourseByID', params)
// 修改课程上下架
export const IsEnableCourse = (params) => ajax(BASE_URL + '/Course/IsEnableCourse', params)
// 课程绑定分类
export const AddCourseJoinClassify = (params) => ajax(BASE_URL + '/Course/AddCourseJoinClassify', params, 'POST')
// 课程评论列表
export const GetReviewByID = (params) => ajax(BASE_URL + '/Course/GetReviewByID', params)
// 课程评论状态
export const ReviewIsEnable = (params) => ajax(BASE_URL + '/Course/ReviewIsEnable', params)
// 删除课程评论
export const DelReview = (params) => ajax(BASE_URL + '/Course/DelReview', params)
// ---------------------------------------权限管理--------------------------------------------
// 获取权限菜单
export const GetRoleMenu = (params) => ajax(BASE_URL + '/Role/GetRoleMenu', params)
// 获取全部角色
export const GetRoleList = (params) => ajax(BASE_URL + '/Role/GetRoleList', params)
// 添加角色权限
export const AddRoleAndMenu = (params) => ajax(BASE_URL + '/Role/AddRoleAndMenu', params, 'POST')
// 更新角色权限
export const MenuJoinRoles = (params) => ajax(BASE_URL + '/Role/MenuJoinRoles', params, 'POST')
// 删除角色
export const DeleteRole = (params) => ajax(BASE_URL + '/Role/DeleteRole', params)
// 获取角色信息
export const GetRoleMemberByID = (params) => ajax(BASE_URL + '/Role/GetRoleMemberByID', params)
// 获取部门
export const GetAllDepartmentType = (params) => ajax(BASE_URL + '/Role/GetAllDepartmentType', params)
// 获取人员
export const GetMemberByRoleMenu = (params) => ajax(BASE_URL + '/Role/GetMemberByRoleMenu', params)
// 角色关联人员
export const AppUserJoinRoles = (params) => ajax(BASE_URL + '/Role/AppUserJoinRoles', params, 'POST')
// ---------------------------------------营销管理---------------------------------------------
// 获取频道列表
export const GetChaine = (params) => ajax(BASE_URL + '/Marketing/GetChaine', params)
// 添加频道
export const AddChaine = (params) => ajax(BASE_URL + '/Marketing/AddChaine', params)
// 修改频道
export const UptChaine = (params) => ajax(BASE_URL + '/Marketing/UptChaine', params)
// 删除频道
export const DelChaine = (params) => ajax(BASE_URL + '/Marketing/DelChaine', params)
// --------------------------------------广告位管理-------------------------------------------
// 获取广告位列表
export const GetPosition = (params) => ajax(BASE_URL + '/Marketing/GetPosition', params)
// 修改广告位置上下架
export const ChangePosition = (params) => ajax(BASE_URL + '/Marketing/ChangePosition', params)
// 添加广告位置
export const AddPosition = (params) => ajax(BASE_URL + '/Marketing/AddPosition', params)
// 修改广告位置
export const UptPosition = (params) => ajax(BASE_URL + '/Marketing/UptPosition', params)
// 删除广告位置
export const DelPosition = (params) => ajax(BASE_URL + '/Marketing/DelPosition', params)
// --------------------------------------广告列表 --------------------------------------------
// 查询广告
export const GetAD = (params) => ajax(BASE_URL + '/Marketing/GetAD', params)
// 新建广告
export const AddAD = (params) => ajax(BASE_URL + '/Marketing/AddAD', params)
// 删除广告
export const DelAD = (params) => ajax(BASE_URL + '/Marketing/DelAD', params)
// 修改上下架
export const ChangeAD = (params) => ajax(BASE_URL + '/Marketing/ChangeAD', params)
// 广告反填接口
export const GetADByID = (params) => ajax(BASE_URL + '/Marketing/GetADByID', params)
// 修改广告
export const UptAD = (params) => ajax(BASE_URL + '/Marketing/UptAD', params)
// -------------------------------------帮助管理-----------------------------------------------
// 获取帮助分类列表
export const GetHelpType = (params) => ajax(BASE_URL + '/Marketing/GetHelpType', params)
// 删除帮助分类
export const DelHelpType = (params) => ajax(BASE_URL + '/Marketing/DelHelpType', params)
// 增加帮助分类
export const AddHelpType = (params) => ajax(BASE_URL + '/Marketing/AddHelpType', params)
// 修改帮助分类
export const UptHelpType = (params) => ajax(BASE_URL + '/Marketing/UptHelpType', params)
// 新建帮助
export const AddHelp = (params) => ajax(BASE_URL + '/Marketing/AddHelp', params, 'POST')
// 查询所有帮助
export const GetHelp = (params) => ajax(BASE_URL + '/Marketing/GetHelp', params)
// 修改帮助
export const UptHelp = (params) => ajax(BASE_URL + '/Marketing/UptHelp', params, 'POST')
// 修改帮助上下架
export const ChangeHelp = (params) => ajax(BASE_URL + '/Marketing/ChangeHelp', params)
// 反填数据
export const GetInfoByID = (params) => ajax(BASE_URL + '/Marketing/GetInfoByID', params)
// 删除帮助
export const DelHelp = (params) => ajax(BASE_URL + '/Marketing/DelHelp', params)
// --------------------------------------合作伙伴管理---------------------------------------------
// 添加友情链接
export const AddFriendlyLink = (params) => ajax(BASE_URL + '/Marketing/AddFriendlyLink', params)
// 获取友情链接列表
export const GetFriendlyLink = (params) => ajax(BASE_URL + '/Marketing/GetFriendlyLink', params)
// 修改友情链接
export const UptFriendlyLink = (params) => ajax(BASE_URL + '/Marketing/UptFriendlyLink', params)
// 修改友情链接状态
export const ChangeFriend = (params) => ajax(BASE_URL + '/Marketing/ChangeStatePartner', params)
// 删除友情链接
export const DelFriendlyLink = (params) => ajax(BASE_URL + '/Marketing/DelFriendlyLink', params)
// ---------------------------------------- 登录 -------------------------------------------------
// 登录
export const CheckUserLogin = (params) => ajax(BASE_URL + '/Login/CheckUserLogin', params, 'POST')
// 获取登录人员角色
export const GetRoleByID = (params) => ajax(BASE_URL + '/Role/GetRoleByID', params)
// 获取用户姓名
export const GetLoginName = () => ajax(BASE_URL + '/Login/GetLoginName')
// 获取验证码
export const vercode = () => ajax(BASE_URL + '/vercode')
// 验证码点击
export const CheckPicCode = (params) => ajax(BASE_URL + '/CheckPicCode', params, 'POST')
// --------------------------------------- 会员 --------------------------------------------------
// 个人会员信息列表
export const GetPersonalList = (params) => ajax(BASE_URL + '/Orgin/GetPersonalList', params)
// 修改会员状态
export const ChangeStateP = (params) => ajax(BASE_URL + '/Orgin/ChangeStateP', params)
// 个人会员微信解绑
export const UnbindWX = (params) => ajax(BASE_URL + '/Orgin/UnbindWX', params)
// 企业列表(审核通过)
export const GetEnterpriseList = (params) => ajax(BASE_URL + '/Orgin/GetEnterpriseList', params)
// 企业员工列表
export const GetAllMember  = (params) => ajax(BASE_URL + '/Orgin/GetAllMemberByDepartment', params)
// 根据id查看企业信息
export const GetEnterpriseInfoByID  = (params) => ajax(BASE_URL + '/Orgin/GetEnterpriseInfoByID', params)
// 企业： 岗位列表
export const GetPostByID  = (params) => ajax(BASE_URL + '/Orgin/GetEnterpriseDepartment', params)
// 企业 ： 职位列表
export const GetPost  = (params) => ajax(BASE_URL + '/Orgin/GetPostByID', params)
// 企业：重置密码
export const UptPassword  = (params) => ajax(BASE_URL + '/Orgin/UptPassword', params)
// 企业 开通功能模块  ---
export const OpenMenu  = (params) => ajax(BASE_URL + '/Orgin/OpenMenu', params)
// 企业待审核列表
export const GetEnterpriseListNoPass  = (params) => ajax(BASE_URL + '/Orgin/GetEnterpriseListNoPass', params)
// 企业审核
export const ChangeStateEnterprise  = (params) => ajax(BASE_URL + '/Orgin/UpdateAppUserState', params)
// 企业：修改状态
export const ChangeStateE  = (params) => ajax(BASE_URL + '/Orgin/ChangeStateE', params)
// 已审核讲师列表
export const GetTeacherList  = (params) => ajax(BASE_URL + '/Orgin/GetTeacherList', params)
// 待审核讲师列表
export const GetOthorListNoPass  = (params) => ajax(BASE_URL + '/Orgin/GetOthorListNoPass', params)
// 讲师获取信息
export const GetTeacherInfoByIDFS  = (params) => ajax(BASE_URL + '/Orgin/GetTeacherInfoByIDFS', params)
// 讲师信息审核
export const ChangeStateFS  = (params) => ajax(BASE_URL + '/Orgin/UpdateAppUserState', params)
// 制造企业：数据列表
export const GetTeacherInfoByIDTF  = (params) => ajax(BASE_URL + '/Orgin/GetTeacherInfoByIDTF', params)
// 讲师机构：修改状态
export const ChangeStateT  = (params) => ajax(BASE_URL + '/Orgin/ChangeStateT', params)
// 机构重置密码
export const UptPasswordT  = (params) => ajax(BASE_URL + '/Orgin/UptPasswordT', params)
// ---------------------------------------------文章文档--------------------------------------------------
// 企业文档列表
export const GetDocumentList  = (params) => ajax(BASE_URL + '/Document/GetDocumentList', params)
// 企业文档状态修改
export const ChangeDocument  = (params) => ajax(BASE_URL + '/Document/ChangeDocument', params)
// 获取企业文档详情
export const GetDocumentByID  = (params) => ajax(BASE_URL + '/Document/GetDocumentByID', params)
// 文章列表
export const GetArticleList  = (params) => ajax(BASE_URL + '/Article/GetArticleList', params)
// 添加文章
export const AddArticle  = (params) => ajax(BASE_URL + '/Article/AddArticle', params, 'POST')
// 删除文章
export const DelArticle  = (params) => ajax(BASE_URL + '/Article/DelArticle', params)
// 根据id获取文章
export const GetArticleByID  = (params) => ajax(BASE_URL + '/Article/GetArticleByID', params)
// 修改文章
export const UptArticle  = (params) => ajax(BASE_URL + '/Article/UptArticle', params, 'POST')
// 改变文章上下架
export const ChangeStateArticle  = (params) => ajax(BASE_URL + '/Article/ChangeStateArticle', params)
// ----------------------------------文章 ------------------------------------------------------------
// 获取所有文章分类
export const GetAllArticleType = (params) => ajax(BASE_URL + '/Article/GetAllArticleType', params)
// 添加文章分类
export const AddArticleType = (params) => ajax(BASE_URL + '/Article/AddArticleType', params)
// 删除分类
export const DelArticleType = (params) => ajax(BASE_URL + '/Article/DelArticleClassify', params)
// 根据ID查询分类
export const GetTypeByID = (params) => ajax(BASE_URL + '/Article/GetTypeByID', params)
// 编辑文章分类
export const UptType = (params) => ajax(BASE_URL + '/Article/UptType', params)
// 获取企业文章
export const GetArticleByEnterprise = (params) => ajax(BASE_URL + '/Article/GetArticleByEnterprise', params)
// 修改文章上下架状态
export const GetChangeState = (params) => ajax(BASE_URL + '/Article/GetChangeState', params)
// ----------------------------------订单相关 ------------------------------------------------------------
//获取订单列表
export const GetOrderInfo = (params) => ajax(BASE_URL + '/Charge/GetOrderInfo', params)
//获取可以充值订单的企业列表
export const GetEnterpriseOrder = (params) => ajax(BASE_URL + '/Charge/GetEnterpriseOrder', params)
//获取可以充值订单的课程列表
export const GetCourseOrder = (params) => ajax(BASE_URL + '/Charge/GetCourseOrder', params)
//获取可以充值订单的人的列表
export const GetMemberOrder = (params) => ajax(BASE_URL + '/Charge/GetMemberOrder', params)
//添加订单
export const AddOrder = (params) => ajax(BASE_URL + '/Charge/AddOrder',params,'POST')
//导入课程表路径
export const InputInfo = (params) => ajax(BASE_URL + '/Charge/InputInfo', params)
//获取订单的企业/人员列表
export const GetUserByOrder = (params)=>ajax(BASE_URL+'/Charge/GetUserByOrder',params)
//获取订单课程列表
export const GetCourseByOrder = (params)=>ajax(BASE_URL+'/Charge/GetCourseByOrder',params)
//获取免费课程列表GetOrderFreeCourse
export const GetOrderFreeCourse = (params)=>ajax(BASE_URL+'/Charge/GetOrderFreeCourse',params,'POST')

// 首页数据
export const GetIndexNewAppUser = () => ajax(BASE_URL + '/IndexShow/IndexNewAppUser')
// 新建课程数量
export const GetIndexNewCourse  = (params) => ajax(BASE_URL + '/IndexShow/IndexNewCourse', params)
// 新增文章数量
export const GetIndexNewArticle  = (params) => ajax(BASE_URL + '/IndexShow/IndexNewArticle', params)
// 新增评论
export const GetIndexNewComment  = (params) => ajax(BASE_URL + '/IndexShow/IndexNewComment', params)
// 新增企业
export const GetIndexNewEnterprise  = () => ajax(BASE_URL + '/IndexShow/IndexNewEnterprise')
// 新增机构
export const GetIndexNewVIP  = () => ajax(BASE_URL + '/IndexShow/IndexNewVIP')
// 新增讲师
export const GetIndexNewTeacher  = () => ajax(BASE_URL + '/IndexShow/IndexNewTeacher')
// 新增药厂
export const GetIndexNewFactory  = () => ajax(BASE_URL + '/IndexShow/IndexNewFactory')
// 学习统计
// 个人统计
export const GetPersonal  = (params) => ajax(BASE_URL + '/Statistics/GetPersonalData', params)
// 企业统计
export const GetEnterpriseData  = (params) => ajax(BASE_URL + '/Statistics/GetEnterpriseData', params)

// -----------------------------岗位地图--------------------------------------------------------------
// --------------------------获取岗位-----------------------------------------------------------------
export const GetAllPothClassify  = (params) => ajax(BASE_URL + '/Course/GetAllPothClassify', params)
// 删除岗位地图
export const DelPothMapType  = (params) => ajax(BASE_URL + '/Course/DelPothMapType', params)
// 增加岗位地图
export const AddPothMapType  = (params) => ajax(BASE_URL + '/Course/AddPothMapType', params)
// 编辑岗位地图
export const UptPothMapType  = (params) => ajax(BASE_URL + '/Course/UptPothMapType', params)