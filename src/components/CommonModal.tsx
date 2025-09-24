import CloseButton from '@/assets/close-button.svg?react';

interface CommonModalProps {
  message: string;
  onClose: () => void;
  themeName?: 'light' | 'dark';
}
const CommonModal = ({ message, onClose, themeName }: CommonModalProps) => {
  return (
    <div className={`fixed inset-0 ${themeName === 'light' ? 'bg-black/30' : 'bg-gray/30'}`} onClick={onClose}>
      <div
        className={`fixed top-1/2 left-1/2 z-50 flex h-40 w-96 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-lg border border-solid p-5 ${themeName === 'light' ? 'border-gray bg-white text-black' : 'bg-deepGray border-darkGray text-white'} `}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton
          className={`absolute top-4 right-4 h-[18px] w-[18px] cursor-pointer stroke-[currentColor] ${themeName === `light` ? 'text-black' : 'text-white'}`}
          onClick={onClose}
        />
        <div className="text-cap1-b flex items-center justify-between">{message}</div>
      </div>
    </div>
  );
};
export default CommonModal;
