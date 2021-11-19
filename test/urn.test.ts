import { PicapicaUrn } from "../src/lib/session/urn";

test("parse", () => {
	function parse(urn: string): PicapicaUrn | Error {
		try {
			return PicapicaUrn.parse(urn);
		} catch (error) {
			if (error instanceof Error) {
				return error;
			}
			throw error;
		}
	}

	const urns = [
		// invalid
		"foo",
		"urn:foo:something",
		"urn:picapica:foo",
		"urn:picapica:item:324",

		// valid
		"urn:picapica:collection:dewiki",
		"urn:PicaPica:collection:dewiki",
		"urn:picapica:document:dewiki:e1bd8a08-64e3-4eed-a70d-5e435a88e707",
		"urn:picapica:session:f2270a54-88d6-4572-9b9c-9b60bfb43de3",
		"urn:picapica:item:f2270a54-88d6-4572-9b9c-9b60bfb43de3:a1244e8526a71095fe21825f073afe2a34f997e53874cd6986bdc049e218aced",
		"urn:picapica:result:f2270a54-88d6-4572-9b9c-9b60bfb43de3:a1244e8526a71095fe21825f073afe2a34f997e53874cd6986bdc049e218aced",
	];

	for (const urn of urns) {
		expect(parse(urn)).toMatchSnapshot();
	}
});
