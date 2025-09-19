import CloseButton from '@/assets/close-button.svg?react';

interface CommonModalProps {
  message: string;
  onClose: () => void;
  themeName?: 'light' | 'dark';
}
const CommonModal = ({ message, onClose, themeName }: CommonModalProps) => {
  return (
    <div className={`fixed left-1/2 top-1/2 z-50 flex w-96 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-lg border border-solid p-5 ${themeName === 'light' ? 'bg-white border-gray text-black' : 'bg-deepGray border-darkGray text-white'}`}>
      <CloseButton className="absolute top-3 right-3 cursor-pointer"/>
      <div className="flex items-center justify-between">{message}</div>
    </div>
  );
};
export default CommonModal;
