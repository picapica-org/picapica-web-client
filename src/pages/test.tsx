import React from "react";
import { Helmet } from "react-helmet";
import { AlignmentView } from "../elements/alignment-view";
import { Page } from "../elements/page";
import { SharedHead } from "../elements/shared-header";
import { Item } from "../lib/generated/v1/types_pb";
import { getCurrentLang, LocalizableProps } from "../lib/localization";
import { dynamic } from "../lib/react-util";
import { DeepRequired } from "../lib/util";
import "./legal.scss";

export default function TestPage(): JSX.Element {
	return (
		<>
			{dynamic(() => (
				<Test lang={getCurrentLang()} />
			))}
			<SharedHead />
			<Helmet>
				<title>Picapica</title>
			</Helmet>
		</>
	);
}

function Test(props: LocalizableProps): JSX.Element {
	const foo: DeepRequired<Item.Resource.AsObject> = {
		urn: "asdasdasd",
		type: 3,
		properties: { contentChecksum: "", length: 4, rawChecksum: "d", size: 4 },
	};
	return (
		<Page {...props} className="Test" header="small">
			<AlignmentView left={testA} right={testB} />
			{foo.urn}
		</Page>
	);
}

const testA = `commanders on both sides, like Lord Kitchener, predicted the war would be a long one. Other political leaders, such as Bethmann Hollweg in Germany, were concerned by the potential social consequences of a war. International bond and financial markets entered severe crises in late July and early August reflecting worry about the financial consequences of war. The perceived excitement of war captured the imagination of many in the warring nations. Spurred on by propaganda and nationalist fervor, many eagerly joined the ranks in search of adventure. Few were prepared for what they actually encountered at the front. See also: Recruitment to the British Army during WW I Trench warfare begins See main article: Western Front (World War I) After their initial success on the Marne, Entente and German forces began a series of outflanking manoeuvres to try to force the other to retreat, in the so-called Race to the Sea. Britain and France soon found themselves facing entrenched German positions from Lorraine to Belgium's Flemish coast. The British and French sought to take the offensive while Germany sought to defend the territories it had occupied. One consequence of this was that the German trenches were much better constructed than those of their enemy: the Anglo-French trenches were only intended to be 'temporary' before their forces broke through the German defences. In April 1915,the Germans used mustard gas for the first time,opening a 4 mile wide hole in the Allied lines when French colonial troops retreated from it. This breach was closed by Canadian soldiers. Neither side proved able to deliver a decisive blow for the next four years, though protracted German action at Verdun throughout (1916), and the Entente's failure at the Somme in the summer of 1916 brought the French army to the brink of collapse. Futile attempts at more frontal assaults, at terrible cost to the French poilu infantry, led to mutinies which threatened the integrity of the front line in 1917 after the Nivelle Offensive in the spring of 1917. News of the Russian Revolution gave a new incentive to socialist sentiments. Red flags were hoisted and the Internationale was sung on several occasions. At the height of the mutiny, 30,000 to 40,000 French soldiers participated. Throughout 1915-17 the British Empire and French armies suffered many more casualties than the German one, but both sides lost millions of soldiers to injury and disease. Around 800,000 soldiers from the British Empire were on the Western Front`;
const testB = `Main article: Western Front (World War I) Trench warfare begins Trenches of the 11th Cheshire Regiment at Ovillers-la-Boisselle, on the Somme, July 1916 Military tactics which were developed before World War I failed to keep pace with advances in technology and had become obsolete. These advances had allowed the creation of strong defensive systems, which out-of-date military tactics could not break through for most of the war. Barbed wire was a significant hindrance to massed infantry advances, while artillery, vastly more lethal than in the 1870s, coupled with machine guns, made crossing open ground extremely difficult.[95] Commanders on both sides failed to develop tactics for breaching entrenched positions without heavy casualties. In time, however, technology began to produce new offensive weapons, such as gas warfare and the tank.[96] After the First Battle of the Marne (5–12 September 1914), Allied and German forces unsuccessfully tried to outflank each other, a series of manoeuvres later known as the "Race to the Sea". By the end of 1914, the opposing forces were left confronting each other along an uninterrupted line of entrenched positions from Alsace to Belgium's North Sea coast.[14] Since the Germans were able to choose where to stand, they normally had the advantage of the high ground; in addition, their trenches tended to be better built, since Anglo-French trenches were initially intended as "temporary," and would only be needed until the breaking of German defences.[97] Both sides tried to break the stalemate using scientific and technological advances. On 22 April 1915, at the Second Battle of Ypres, the Germans (violating the Hague Convention) used chlorine gas for the first time on the Western Front. Several types of gas soon became widely used by both sides, and though it never proved a decisive, battle-winning weapon, poison gas became one of the most-feared and best-remembered horrors of the war.[98] [99] Tanks were developed by Britain and France and were first used in combat by the British during the Battle of Flers–Courcelette (part of the Battle of the Somme) on 15 September 1916, with only partial success. However, their effectiveness would grow as the war progressed; the Allies built tanks in large numbers, whilst the Germans employed only a few of their own design, supplemented by captured Allied tanks. Continuation of trench warfare French 87th regiment near Verdun, 1916 Neither side proved able to deliver a decisive blow for the next two years. Throughout 1915–17, the British Empire and`;
