import dynamic from "next/dynamic";

const liveComponents: Record<string, any> = {
  "cinema-booking": dynamic(() =>
    import("@/components/machine-coding/cinema-booking/CinemaHallSeatBookingDemo")
  ),
//   "todo-app": dynamic(() =>
//     import("@/components/machine-coding/todo-app/TodoAppDemo")
//   ),
  // add more as you go...
};

export default async function LivePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const Component = liveComponents[slug];

  if (!Component) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">
          No live demo available for "{slug}"
        </h1>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <Component />
    </div>
  );
}