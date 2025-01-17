/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
	testEnvironment: 'jsdom',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	transform: {
		'^.+\\.(ts|tsx)$': [
			'ts-jest',
			{
				tsconfig: './tsconfig.jest.json',
			},
		],
	},

	moduleNameMapper: {
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/test/__mocks__/fileMock.js',
		'^@/(.*)$': '<rootDir>/src/$1',
		// '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
	},
}
