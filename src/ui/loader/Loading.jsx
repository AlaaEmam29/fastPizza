import ReactLoading from 'react-loading';

export default function Loading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <ReactLoading type="spokes" color="rgb(10,10,10)" />
    </div>
  );
}
