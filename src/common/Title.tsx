interface TitleProps {
	text: string;
}

export function H4(props: TitleProps) {
	return <h4 className='text-lg font-semibold'>{props.text}</h4>;
}

export function CH4(props: TitleProps) {
	return (
		<div className='table m-auto mt-8'>
			<H4 text={props.text} />
		</div>
	);
}

export function H2(props: TitleProps) {
	return (
		<h2 className='justify-items-center m-auto text-3xl font-black'>
			{props.text}
		</h2>
	);
}

export function CH2(props: TitleProps) {
	return (
		<div className='table m-auto mt-8'>
			<H2 text={props.text} />
		</div>
	);
}

export function H1(props: TitleProps) {
	return <h1 className='text-4xl font-black'>{props.text}</h1>;
}
