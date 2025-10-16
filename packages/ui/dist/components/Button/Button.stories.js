import { Button } from './Button';
const meta = {
    title: 'UI/Button',
    component: Button,
};
export default meta;
export const 기본 = {
    args: {
        children: '클릭하세요',
        onClick: () => alert('버튼 클릭!'),
    },
};
