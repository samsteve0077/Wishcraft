import CharacterSelector from "../dashboard/CharacterSelector";

function BirthdayInfoStep({ creatorData, setCreatorData }) {
  return (
    <CharacterSelector
      creatorData={creatorData}
      setCreatorData={setCreatorData}
    />
  );
}

export default BirthdayInfoStep;