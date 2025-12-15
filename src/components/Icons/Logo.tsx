type Props = {
	className?: string;
};

export function Logo({ className = "" }: Props) {
	return (
		<>
			<Mobile className={className} />
			<Desktop className={className} />
		</>
	);
}

function Mobile({ className = "" }: Props) {
	return (
		<svg
			id="Vrstva_1"
			xmlns="http://www.w3.org/2000/svg"
			version="1.1"
			viewBox="0 0 32.4 19"
			className={`${className} md:hidden`}
		>
			<rect fill="var(--foreground)" x="30.2" width="2.2" height="8.9" />
			<path
				fill="var(--foreground)"
				d="M8.9,0v8.9h-2.2V3.7l-2.2,3.4-2.2-3.4v5.2H0V0h1.8c.3,0,.5.1.7.4l2,3L6.5.4c.2-.2.4-.4.7-.4h1.8Z"
			/>
			<path
				fill="var(--foreground)"
				d="M28.2,3h-.3V.8c0-.5-.4-.8-.8-.8h-7v8.9h8.1c.5,0,.8-.4.8-.8V3.8c0-.5-.4-.8-.8-.8ZM22.4,1.9h2.9c.2,0,.4.2.4.4v.3c0,.2-.2.4-.4.4h-2.9v-1.1ZM26.8,6.3c0,.2-.2.4-.4.4h-4.1v-1.5h4.1c.2,0,.4.2.4.4v.7Z"
			/>
			<path
				fill="#00ce5d"
				d="M18.2,0h-7.3c-.5,0-.8.4-.8.8v7.3c0,.5.4.8.8.8h7.3c.5,0,.8-.4.8-.8V.8c0-.5-.4-.8-.8-.8ZM16.8,6.3c0,.2-.2.4-.4.4h-3.6c-.2,0-.4-.2-.4-.4v-3.6c0-.2.2-.4.4-.4h3.6c.2,0,.4.2.4.4v3.6Z"
			/>
			<rect
				fill="var(--foreground)"
				x="30.2"
				y="10.1"
				width="2.2"
				height="8.9"
			/>
			<polygon
				fill="var(--foreground)"
				points="29.1 10.1 29.1 12.3 25.7 12.3 25.7 19 23.5 19 23.5 12.3 20.1 12.3 20.1 10.1 29.1 10.1"
			/>
			<path
				fill="var(--foreground)"
				d="M12.3,19v-3h5.9c.5,0,.8-.4.8-.8v-4.3c0-.5-.4-.8-.8-.8h-8.1v8.9h2.2ZM12.3,12.3h4.1c.2,0,.4.2.4.4v.7c0,.2-.2.4-.4.4h-4.1v-1.5Z"
			/>
			<path
				fill="#ea1d6a"
				d="M8.1,10.1H.8c-.5,0-.8.4-.8.8v7.3c0,.5.4.8.8.8h7.3c.5,0,.8-.4.8-.8v-7.3c0-.5-.4-.8-.8-.8ZM6.7,16.4c0,.2-.2.4-.4.4h-3.6c-.2,0-.4-.2-.4-.4v-3.6c0-.2.2-.4.4-.4h3.6c.2,0,.4.2.4.4v3.6Z"
			/>
		</svg>
	);
}

function Desktop({ className = "" }: Props) {
	return (
		<svg
			id="Vrstva_1"
			xmlns="http://www.w3.org/2000/svg"
			version="1.1"
			viewBox="0 0 1593 216"
			className={`${className} hidden md:block`}
		>
			<rect fill="var(--foreground)" x="729" width="54" height="216" />
			<path
				fill="var(--foreground)"
				d="M216,0v216h-54v-126l-54,81-54-81v126H0V0h43.3c6.7,0,12.9,3.3,16.6,8.9l48.1,72.1L156.1,8.9c3.7-5.6,10-8.9,16.6-8.9h43.3Z"
			/>
			<rect fill="var(--foreground)" x="1539" width="54" height="216" />
			<polygon
				fill="var(--foreground)"
				points="1512 0 1512 54 1431 54 1431 216 1377 216 1377 54 1296 54 1296 0 1512 0"
			/>
			<path
				fill="var(--foreground)"
				d="M1107,216v-72h142c11,0,20-9,20-20V20c0-11-9-20-20-20h-196v216h54ZM1107,54h98c5.5,0,10,4.5,10,10v16c0,5.5-4.5,10-10,10h-98v-36Z"
			/>
			<path
				fill="var(--foreground)"
				d="M682,72h-7V20c0-11-9-20-20-20h-169v216h196c11,0,20-9,20-20v-104c0-11-9-20-20-20ZM540,45h71c5.5,0,10,4.5,10,10v7c0,5.5-4.5,10-10,10h-71v-27ZM648,152c0,5.5-4.5,10-10,10h-98v-36h98c5.5,0,10,4.5,10,10v16Z"
			/>
			<path
				fill="#ea1d6a"
				d="M1006,0h-176c-11,0-20,9-20,20v176c0,11,9,20,20,20h176c11,0,20-9,20-20V20c0-11-9-20-20-20ZM972,152c0,5.5-4.5,10-10,10h-88c-5.5,0-10-4.5-10-10v-88c0-5.5,4.5-10,10-10h88c5.5,0,10,4.5,10,10v88Z"
			/>
			<path
				fill="#00ce5d"
				d="M439,0h-176c-11,0-20,9-20,20v176c0,11,9,20,20,20h176c11,0,20-9,20-20V20c0-11-9-20-20-20ZM405,152c0,5.5-4.5,10-10,10h-88c-5.5,0-10-4.5-10-10v-88c0-5.5,4.5-10,10-10h88c5.5,0,10,4.5,10,10v88Z"
			/>
		</svg>
	);
}
