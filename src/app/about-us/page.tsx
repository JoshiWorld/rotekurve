export default async function AboutUs() {
    

    return (
      <div
        className="mt-8 flex flex-col items-center gap-2"
        dangerouslySetInnerHTML={{ __html: item.content || "" }}
      />
    );
}