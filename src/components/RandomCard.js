import { useState, useEffect } from "react";

// Khởi tạo 13 lá bài ngẫu nhiên, có thể trùng nhau, không theo thứ tự
const generateRandomCards = () => {
  return Array(13)
    .fill(null)
    .map((_, index) => ({
      id: Math.floor(Math.random() * 13), // Giá trị từ 0 đến 12
      isFlipped: false,
      index: index,
    }));
};

export default function CardGame() {
  const [cardStates, setCardStates] = useState(generateRandomCards());
  const [flipCount, setFlipCount] = useState(0);
  const [comparisonCount, setComparisonCount] = useState(0);
  const [targetCard, setTargetCard] = useState(null);

  useEffect(() => {
    // Chọn ngẫu nhiên một giá trị từ 0 đến 12 làm mục tiêu
    const randomTarget = Math.floor(Math.random() * 13);
    setTargetCard({ id: randomTarget });
  }, []);

  const flipCard = (cardIndex) => {
    let comparisons = 0;
    setCardStates((prev) =>
      prev.map((card, index) => {
        comparisons++;
        if (index === cardIndex) {
          if (!card.isFlipped) {
            setFlipCount((prev) => prev + 1);
          }
          return { ...card, isFlipped: !card.isFlipped };
        }
        return card;
      })
    );
    setComparisonCount((prev) => prev + comparisons);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center p-4 bg-white min-h-screen top-10">
        <h1 className="text-3xl font-bold mb-6">Tìm Kiếm Duyệt</h1>
        <div className={`text-2xl font-bold mb-4 ${targetCard && cardStates.some(card => card.isFlipped && card.id === targetCard.id) ? 'text-green-500' : ''}`}>
        Số lần lật bài: {flipCount}
        </div>
        {targetCard && (
          <div className="mb-4 text-xl font-semibold">
            Tìm lá bài:
            <div className="w-20 h-28 flex items-center justify-center border rounded-xl shadow-md bg-white mx-auto">
              <img
                src={`/images/card-${targetCard.id + 1}.png`}
                alt={`Card ${targetCard.id + 1}`}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}
        <div className="flex gap-2 flex-wrap justify-center">
          {cardStates.map((card, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-20 h-28 flex items-center justify-center border rounded-xl shadow-md cursor-pointer transition-transform transform ${
                  card.isFlipped ? "bg-white" : "bg-gray-800"
                }`}
                onClick={() => flipCard(index)}
              >
                {card.isFlipped ? (
                  <img
                    src={`/images/card-${card.id + 1}.png`}
                    alt={`Card ${card.id + 1}`}
                    className="w-full h-full object-contain"
                  />
                ) : null}
              </div>
              <div className="mt-1 text-sm font-semibold">{index}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
