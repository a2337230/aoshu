import ajax from './ajax'
// const BASE_URL = ''
const BASE_URL = 'https://www2.xlxt.net' 

export const GetArticleShow = () => ajax(BASE_URL + '/Article/GetArticleShow?Keyword=&ClassifyID=51&Pagesize=15&Pageindex=1&IsRecommend=0')
// 获取文章详情有权限
export const ArticleInfo1 = (params) => ajax(BASE_URL + '/Article/GetArticleByID', params)
// 获取文章详情无权限
export const ArticleInfo2 = (params) => ajax(BASE_URL + '/Article/GetArticleByIDShow', params)
// 获取评价
export const GetReviewFront = (params) => ajax(BASE_URL + '/Review/GetArticleReviewFront', params)
// 文章添加评价
export const AddReview = (params) => ajax(BASE_URL + '/Review/AddArticleReview', params)
// 文章评论点赞
export const AddReviewLike = (params) => ajax(BASE_URL + '/Review/AddArticleReviewLike', params)
// 获取直播
export const GetLive = (params) => ajax(BASE_URL + '/AD/GetAD', params)
// 获取课程详情
export const GetCourseByIDShow = (params) => ajax(BASE_URL + '/Course/GetCourseByIDShow', params)
// 增加浏览量
export const UpdateCourseBrowseNum = (params) => ajax(BASE_URL + '/Course/UpdateCourseBrowseNum', params)
// 获取直播
export const GetCoursewareByID = (params) => ajax(BASE_URL + '/Course/GetCoursewareByID', params)
// 获取直播评论
export const GetCourseMessage = (params) => ajax(BASE_URL + '/PM/GetCourseMessage', params)
// 发表直播评论
export const SendCourseMessage = (params) => ajax(BASE_URL + '/PM/SendCourseMessage', params, 'POST')
// 获取课程目录
export const GetChapterCoursewareShow = (params) => ajax(BASE_URL + '/Course/GetChapterCoursewareShow', params)
// 获取课程评论
export const GetReview = (params) => ajax(BASE_URL + '/Review/GetReview', params)
// 添加课程评论
export const AddCourseReview = (params) => ajax(BASE_URL + '/Review/AddReview', params, 'POST')
// 视频播放
export const VideoPlay = (params) => ajax(BASE_URL + '/Course/GetPlayAuthByVideoID', params)
// 课程播放
export const GetCoursewareByIDShow = (params) => ajax(BASE_URL + '/Course/GetCoursewareByIDShow', params)
// 判断是否登录
export const GetMemberInfo = (params) => ajax(BASE_URL + '/Member/GetMemberInfo', params)
// 验证是否绑定企业
export const CheckAppUserJoinEnterprise = (params) => ajax(BASE_URL + '/Member/CheckAppUserJoinEnterprise', params)
// 验证企业
export const AddAppUserJoinEnterprise = (params) => ajax(BASE_URL + '/Member/AddAppUserJoinEnterprise', params)