export default function Loading() {
	// You can add any UI inside Loading, including a Skeleton.

	return (
		<div className="spinner">
			<div className="lds-roller">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>

			<div>Loading...</div>
		</div>
	);
}
