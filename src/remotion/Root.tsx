import { Composition, registerRoot } from "remotion";
import { AstronauntIntro } from "./AstronauntIntro";

function RemotionRoot() {
	return (
		<Composition
			id="astronaut-intro"
			component={AstronauntIntro}
			durationInFrames={120}
			fps={30}
			width={1920}
			height={1080}
			defaultProps={{
				title: "Astronaunt",
				subtitle: "Fast Astro starter with production defaults",
			}}
		/>
	);
}

registerRoot(RemotionRoot);
