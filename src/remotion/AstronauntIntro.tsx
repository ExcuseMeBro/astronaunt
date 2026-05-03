import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export type AstronauntIntroProps = {
	title: string;
	subtitle: string;
};

export function AstronauntIntro({ title, subtitle }: AstronauntIntroProps) {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const entrance = spring({ frame, fps, config: { damping: 18, stiffness: 120 } });
	const orbit = interpolate(frame, [0, 120], [0, 360]);
	const opacity = interpolate(frame, [0, 12, 108, 120], [0, 1, 1, 0], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	return (
		<AbsoluteFill
			style={{
				opacity,
				background: "radial-gradient(circle at 20% 20%, #7c3aed 0, transparent 26%), #020617",
				color: "white",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				fontFamily: "Inter, Arial, sans-serif",
				overflow: "hidden",
			}}
		>
			<div
				style={{
					position: "absolute",
					width: 560,
					height: 560,
					border: "1px solid rgba(255,255,255,0.18)",
					borderRadius: "50%",
					transform: `rotate(${orbit}deg) scale(${0.8 + entrance * 0.2})`,
				}}
			>
				<div
					style={{
						position: "absolute",
						top: 48,
						left: 110,
						width: 26,
						height: 26,
						borderRadius: "50%",
						background: "#a78bfa",
						boxShadow: "0 0 60px #a78bfa",
					}}
				/>
			</div>
			<div style={{ textAlign: "center", transform: `translateY(${(1 - entrance) * 40}px)` }}>
				<p style={{ margin: 0, letterSpacing: "0.42em", color: "#a78bfa", fontSize: 28 }}>
					REST • JWT • I18N
				</p>
				<h1 style={{ margin: "24px 0 12px", fontSize: 132, lineHeight: 0.9, fontWeight: 900 }}>
					{title}
				</h1>
				<p style={{ margin: 0, color: "#cbd5e1", fontSize: 36 }}>{subtitle}</p>
			</div>
		</AbsoluteFill>
	);
}
