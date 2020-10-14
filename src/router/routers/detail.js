export default {
    path: '/films/:filmId',
    name: 'detail',
    component: () => import('@/views/Detail/Detail')
}