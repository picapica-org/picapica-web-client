declare module "*.png" {
	const content: string;
	export default content;
}

declare module "*.inline.svg" {
	const content: () => JSX.Element;
	export default content;
}

declare module "*.svg" {
	const content: string;
	export default content;
}

declare module "*.ico" {
	const content: string;
	export default content;
}
