import type { VocabWord } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface VocabListProps {
  words: VocabWord[];
}

export const VocabList = ({ words }: VocabListProps) => (
  <div className="flex flex-col gap-4">
    {words.map((word, i) => (
      <Card
        key={word.id || i}
        className={`border-l-4 ${i === 0 ? 'border-mint' : 'border-peach opacity-60'}`}
      >
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2">
              {word.word}
              <span className="text-xs font-normal text-gray-400 mt-1">{word.pronunciation}</span>
            </h3>
            <p className="text-gray-500 italic mt-0.5">{word.meaning_id}</p>
          </div>
          <Badge color={word.level as any}>{word.level}</Badge>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-xl text-sm text-gray-600 mt-3">
          <p className="font-semibold mb-1 text-xs text-mint">Contoh kalimat:</p>
          "{word.example_sentence}"
          <p className="italic text-xs text-gray-400 mt-2">{word.example_translation}</p>
        </div>
      </Card>
    ))}
  </div>
);

export default VocabList;
