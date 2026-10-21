import Experience from "../experience/Experience";

function PreviewStep({ creatorData }) {
  return (
    <div className="w-full min-h-screen">
      <Experience creatorData={creatorData} />
    </div>
  );
}

export default PreviewStep;