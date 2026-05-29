export type Animal = {
  key: string;
  name: string;
  era: string;
  period: string;
  environment: string;
  lineage: string;
  sharedTrait: string;
  adaptation: string;
  wikiTitle: string;
};

const rows = `
trilobite|Trilobite|Paleozoic|Cambrian|Shallow ocean|Arthropod|Jointed body sections|Hard exoskeleton for protection|Trilobite
anomalocaris|Anomalocaris|Paleozoic|Cambrian|Open ocean|Stem arthropod|Segmented body plan|Grasping appendages for catching prey|Anomalocaris
opabinia|Opabinia|Paleozoic|Cambrian|Sea floor|Stem arthropod|Soft body with paired structures|Proboscis for feeding near the bottom|Opabinia
hallucigenia|Hallucigenia|Paleozoic|Cambrian|Sea floor|Lobopodian|Paired walking limbs|Spines for defense|Hallucigenia
pikaia|Pikaia|Paleozoic|Cambrian|Ocean|Early chordate|Notochord like later vertebrate relatives|Flexible body for swimming|Pikaia
haikouichthys|Haikouichthys|Paleozoic|Cambrian|Ocean|Early fish|Backbone-related chordate traits|Tail and fins for swimming|Haikouichthys
marrella|Marrella|Paleozoic|Cambrian|Sea floor|Arthropod|Jointed limbs|Head spines and antennae for sensing|Marrella
wiwaxia|Wiwaxia|Paleozoic|Cambrian|Sea floor|Early mollusc relative|Soft body|Armor scales and spines|Wiwaxia
orthoceras|Orthoceras|Paleozoic|Ordovician|Ocean|Cephalopod|Shell and tentacle body plan|Straight shell for buoyancy|Orthoceras
eurypterid|Eurypterid|Paleozoic|Ordovician|Coastal water|Arthropod|Jointed limbs and exoskeleton|Paddle limbs for swimming|Eurypterid
coelacanth|Coelacanth|Paleozoic to Modern|Devonian|Deep ocean|Lobe-finned fish|Paired lobe fins with internal bones|Slow hovering movement in deep water|Coelacanth
dunkleosteus|Dunkleosteus|Paleozoic|Devonian|Ocean|Armored fish|Jaws and backbone|Armored head plates and slicing jaws|Dunkleosteus
tiktaalik|Tiktaalik|Paleozoic|Devonian|Shallow water|Lobe-finned fish|Limb bones similar to early tetrapods|Flat head and strong fins for shallow water|Tiktaalik
ichthyostega|Ichthyostega|Paleozoic|Devonian|Swamp edges|Early tetrapod|Backbone and limb bones|Sturdy limbs for moving in shallow water|Ichthyostega
acanthostega|Acanthostega|Paleozoic|Devonian|Swamp water|Early tetrapod|Digits and limb bones|Limbs suited for water support|Acanthostega
eryops|Eryops|Paleozoic|Permian|Swamps|Amphibian|Four limbs and skull bones|Strong jaws for ambush hunting|Eryops
edaphosaurus|Edaphosaurus|Paleozoic|Permian|Warm plains|Synapsid|Backbone and four limbs|Tall sail possibly for heat control|Edaphosaurus
dimetrodon|Dimetrodon|Paleozoic|Permian|Dry lowlands|Synapsid|Skull traits linked to mammal relatives|Tall sail and powerful jaws|Dimetrodon
gorgonops|Gorgonops|Paleozoic|Permian|Open plains|Therapsid|Teeth and skull traits related to mammals|Large canine teeth for hunting|Gorgonops
lystrosaurus|Lystrosaurus|Paleozoic to Mesozoic|Permian-Triassic|Dry floodplains|Therapsid|Four limbs and beak-like jaws|Burrowing body for harsh conditions|Lystrosaurus
proterosuchus|Proterosuchus|Mesozoic|Triassic|Rivers|Archosaur|Four limbs and reptile skull traits|Long jaws for catching fish|Proterosuchus
euparkeria|Euparkeria|Mesozoic|Triassic|Dry land|Archosaur relative|Hip and limb traits shared with later archosaurs|Quick running posture|Euparkeria
plateosaurus|Plateosaurus|Mesozoic|Triassic|Woodlands|Sauropodomorph dinosaur|Dinosaur hip and limb traits|Long neck for browsing plants|Plateosaurus
coelophysis|Coelophysis|Mesozoic|Triassic|River valleys|Theropod dinosaur|Hollow bones and three-toed feet|Light body for fast hunting|Coelophysis
postosuchus|Postosuchus|Mesozoic|Triassic|Dry plains|Pseudosuchian|Archosaur ankle traits|Powerful jaws as top predator|Postosuchus
eoraptor|Eoraptor|Mesozoic|Triassic|Woodlands|Early dinosaur|Dinosaur limb and hip traits|Small agile body|Eoraptor
herrerasaurus|Herrerasaurus|Mesozoic|Triassic|Woodlands|Early theropod|Bipedal dinosaur posture|Sharp teeth and claws for hunting|Herrerasaurus
ichthyosaurus|Ichthyosaurus|Mesozoic|Jurassic|Ocean|Marine reptile|Backbone and reptile ancestry|Streamlined body and flippers|Ichthyosaurus
plesiosaurus|Plesiosaurus|Mesozoic|Jurassic|Ocean|Marine reptile|Four limb bones changed into flippers|Long neck for feeding in water|Plesiosaurus
allosaurus|Allosaurus|Mesozoic|Jurassic|Floodplains|Theropod dinosaur|Three-toed feet and hollow bones|Serrated teeth for hunting|Allosaurus
stegosaurus|Stegosaurus|Mesozoic|Jurassic|Woodlands|Ornithischian dinosaur|Backbone and four-limbed body|Plates and tail spikes for defense|Stegosaurus
brachiosaurus|Brachiosaurus|Mesozoic|Jurassic|Forests|Sauropod dinosaur|Long neck and pillar legs|High browsing neck and large body|Brachiosaurus
diplodocus|Diplodocus|Mesozoic|Jurassic|Floodplains|Sauropod dinosaur|Long neck and tail|Whip-like tail and long reach|Diplodocus
archaeopteryx|Archaeopteryx|Mesozoic|Jurassic|Forest edges|Early bird|Feathers and theropod bones|Wings for gliding or flight|Archaeopteryx
compsognathus|Compsognathus|Mesozoic|Jurassic|Islands|Theropod dinosaur|Bipedal stance and hollow bones|Small fast body|Compsognathus
ceratosaurus|Ceratosaurus|Mesozoic|Jurassic|River floodplains|Theropod dinosaur|Saurischian hip and sharp teeth|Horned skull and strong jaws|Ceratosaurus
camptosaurus|Camptosaurus|Mesozoic|Jurassic|Woodlands|Ornithopod dinosaur|Beak and hind limbs|Chewing plant material|Camptosaurus
ornitholestes|Ornitholestes|Mesozoic|Jurassic|Forests|Theropod dinosaur|Hollow bones and grasping hands|Agile hunting body|Ornitholestes
torvosaurus|Torvosaurus|Mesozoic|Jurassic|Floodplains|Theropod dinosaur|Three-toed feet and large skull|Huge teeth for predation|Torvosaurus
iguanodon|Iguanodon|Mesozoic|Cretaceous|Woodlands|Ornithopod dinosaur|Beak and limb bones|Thumb spike and chewing teeth|Iguanodon
spinosaurus|Spinosaurus|Mesozoic|Cretaceous|River systems|Theropod dinosaur|Hollow bones and three-toed feet|Crocodile-like snout for fish|Spinosaurus
tyrannosaurus|Tyrannosaurus rex|Mesozoic|Cretaceous|Forest plains|Theropod dinosaur|Three-toed feet and hollow bones|Massive jaws and binocular vision|Tyrannosaurus
triceratops|Triceratops|Mesozoic|Cretaceous|Open woodlands|Ceratopsian dinosaur|Beak and four limbs|Horns and frill for defense|Triceratops
velociraptor|Velociraptor|Mesozoic|Cretaceous|Desert dunes|Theropod dinosaur|Feathers and hollow bones|Sickle claw and speed|Velociraptor
ankylosaurus|Ankylosaurus|Mesozoic|Cretaceous|Woodlands|Armored dinosaur|Four limbs and reptile ancestry|Body armor and tail club|Ankylosaurus
pachycephalosaurus|Pachycephalosaurus|Mesozoic|Cretaceous|Woodlands|Ornithischian dinosaur|Bipedal dinosaur limbs|Thick skull dome|Pachycephalosaurus
parasaurolophus|Parasaurolophus|Mesozoic|Cretaceous|Wetlands|Hadrosaur dinosaur|Duck-billed skull and limbs|Head crest for sound or display|Parasaurolophus
mosasaurus|Mosasaurus|Mesozoic|Cretaceous|Ocean|Marine lizard|Reptile skull and backbone|Flippers and powerful tail|Mosasaurus
pteranodon|Pteranodon|Mesozoic|Cretaceous|Coastal skies|Pterosaur|Wing finger bones|Large wings for soaring|Pteranodon
quetzalcoatlus|Quetzalcoatlus|Mesozoic|Cretaceous|Inland plains|Pterosaur|Wing membrane and hollow bones|Giant wingspan for soaring|Quetzalcoatlus
carnotaurus|Carnotaurus|Mesozoic|Cretaceous|Open plains|Theropod dinosaur|Bipedal stance and sharp teeth|Short skull horns and speed|Carnotaurus
deinonychus|Deinonychus|Mesozoic|Cretaceous|Woodlands|Theropod dinosaur|Feathers and bird-like bones|Large sickle claw|Deinonychus
oviraptor|Oviraptor|Mesozoic|Cretaceous|Dry plains|Theropod dinosaur|Feathers and beak-like skull|Nest brooding behavior|Oviraptor
gallimimus|Gallimimus|Mesozoic|Cretaceous|Open plains|Theropod dinosaur|Hollow bones and long legs|Fast running body|Gallimimus
edmontosaurus|Edmontosaurus|Mesozoic|Cretaceous|Coastal plains|Hadrosaur dinosaur|Duck-billed skull and chewing teeth|Large herds and plant grinding|Edmontosaurus
maiasaura|Maiasaura|Mesozoic|Cretaceous|Nesting grounds|Hadrosaur dinosaur|Dinosaur hips and beak|Nest care for young|Maiasaura
argentinosaurus|Argentinosaurus|Mesozoic|Cretaceous|Floodplains|Sauropod dinosaur|Long neck and pillar legs|Enormous size for defense and browsing|Argentinosaurus
sarcosuchus|Sarcosuchus|Mesozoic|Cretaceous|Rivers|Crocodyliform|Armored reptile body|Long snout for ambush hunting|Sarcosuchus
hesperornis|Hesperornis|Mesozoic|Cretaceous|Ocean|Bird|Feathers and bird skeleton|Feet adapted for diving|Hesperornis
confuciusornis|Confuciusornis|Mesozoic|Cretaceous|Forests|Early bird|Feathers and beak|Perching and flight adaptations|Confuciusornis
smilodon|Smilodon|Cenozoic|Quaternary|Grasslands|Mammal|Cat skull and limb traits|Saber teeth for ambush hunting|Smilodon
woolly_mammoth|Woolly Mammoth|Cenozoic|Quaternary|Cold steppe|Mammal|Elephant-like trunk and tusks|Thick fur and fat for cold|Woolly mammoth
mastodon|American Mastodon|Cenozoic|Quaternary|Forests|Mammal|Tusks and trunk like elephants|Teeth for browsing leaves|Mastodon
megatherium|Megatherium|Cenozoic|Quaternary|Grasslands|Mammal|Sloth skeleton traits|Huge claws for pulling branches|Megatherium
glyptodon|Glyptodon|Cenozoic|Quaternary|Grasslands|Mammal|Armadillo-like armor plates|Heavy shell for defense|Glyptodon
dire_wolf|Dire Wolf|Cenozoic|Quaternary|Grasslands|Mammal|Canid teeth and paws|Strong bite for large prey|Dire wolf
cave_bear|Cave Bear|Cenozoic|Quaternary|Caves and forests|Mammal|Bear skeleton and teeth|Large body for cold climates|Cave bear
irish_elk|Irish Elk|Cenozoic|Quaternary|Open woodlands|Mammal|Deer hooves and antlers|Huge antlers for display|Irish elk
short_faced_bear|Short-faced Bear|Cenozoic|Quaternary|Open plains|Mammal|Bear skull and limbs|Long legs for covering distance|Arctodus
terror_bird|Terror Bird|Cenozoic|Paleogene-Neogene|Grasslands|Bird|Feathers and bird skeleton|Powerful beak and running legs|Phorusrhacidae
andrewsarchus|Andrewsarchus|Cenozoic|Paleogene|Coastal plains|Mammal|Hoofed mammal relatives|Large skull and strong jaws|Andrewsarchus
basilosaurus|Basilosaurus|Cenozoic|Paleogene|Ocean|Early whale|Mammal bones and whale traits|Long body for swimming|Basilosaurus
pakicetus|Pakicetus|Cenozoic|Paleogene|River edges|Early whale|Mammal teeth and ear bones|Land legs with early whale ear traits|Pakicetus
ambulocetus|Ambulocetus|Cenozoic|Paleogene|Rivers|Early whale|Mammal limbs and whale ear bones|Feet and tail for swimming|Ambulocetus
arsinoitherium|Arsinoitherium|Cenozoic|Paleogene|Mangroves|Mammal|Hoofed mammal body traits|Large paired horns|Arsinoitherium
brontotherium|Brontotherium|Cenozoic|Paleogene|Woodlands|Mammal|Hoofed mammal limbs|Large body and nasal horn|Brontotherium
entelodon|Entelodon|Cenozoic|Paleogene|Open woodland|Mammal|Hoofed mammal teeth and limbs|Huge jaws for omnivory|Entelodon
hyaenodon|Hyaenodon|Cenozoic|Paleogene|Open plains|Mammal|Mammal teeth and skull|Carnassial teeth for meat|Hyaenodon
paraceratherium|Paraceratherium|Cenozoic|Paleogene|Woodlands|Mammal|Rhinoceros-like limb traits|Very tall browsing body|Paraceratherium
deinotherium|Deinotherium|Cenozoic|Neogene|Forests|Mammal|Elephant relatives with trunk|Downward tusks for feeding|Deinotherium
doedicurus|Doedicurus|Cenozoic|Quaternary|Grasslands|Mammal|Armadillo-like armor|Tail club and shell|Doedicurus
megaloceros|Megaloceros|Cenozoic|Quaternary|Open woodland|Mammal|Deer antlers and hooves|Wide antlers for display|Megaloceros
megalania|Megalania|Cenozoic|Quaternary|Australian woodlands|Reptile|Monitor lizard skull and scales|Large size and venom-like bite|Megalania
thylacine|Thylacine|Cenozoic|Modern extinct|Forests and grasslands|Mammal|Marsupial pouch traits|Dog-like body for hunting|Thylacine
dodo|Dodo|Cenozoic|Modern extinct|Island forest|Bird|Feathers and beak|Flightless island body|Dodo
passenger_pigeon|Passenger Pigeon|Cenozoic|Modern extinct|Forests|Bird|Pigeon wings and beak|Flocking behavior|Passenger pigeon
great_auk|Great Auk|Cenozoic|Modern extinct|Cold coasts|Bird|Feathers and bird skeleton|Flightless diving body|Great auk
pyrenean_ibex|Pyrenean Ibex|Cenozoic|Modern extinct|Mountains|Mammal|Goat hooves and horns|Climbing legs for cliffs|Pyrenean ibex
quagga|Quagga|Cenozoic|Modern extinct|Grasslands|Mammal|Horse family teeth and hooves|Striping and grazing teeth|Quagga
tasmanian_devil|Tasmanian Devil|Cenozoic|Modern|Forest scrub|Mammal|Marsupial pouch traits|Strong bite for scavenging|Tasmanian devil
kangaroo|Red Kangaroo|Cenozoic|Modern|Australian grassland|Mammal|Mammary glands and backbone|Powerful hind legs for hopping|Red kangaroo
koala|Koala|Cenozoic|Modern|Eucalyptus forest|Mammal|Marsupial pouch traits|Digestive system for eucalyptus leaves|Koala
platypus|Platypus|Cenozoic|Modern|Freshwater streams|Mammal|Fur and milk production|Duck-like bill for sensing prey|Platypus
echidna|Short-beaked Echidna|Cenozoic|Modern|Woodlands|Mammal|Milk production and fur|Spines and long tongue for ants|Short-beaked echidna
opossum|Virginia Opossum|Cenozoic|Modern|Forests and towns|Mammal|Marsupial reproductive traits|Prehensile tail and varied diet|Virginia opossum
elephant|African Bush Elephant|Cenozoic|Modern|Savanna|Mammal|Tusks and trunk with elephant relatives|Large ears for cooling|African bush elephant
asian_elephant|Asian Elephant|Cenozoic|Modern|Forests and grasslands|Mammal|Trunk and tusks like other elephants|Smaller ears and forest movement|Asian elephant
blue_whale|Blue Whale|Cenozoic|Modern|Ocean|Mammal|Forelimb bones like other mammals|Baleen and huge body for filter feeding|Blue whale
humpback_whale|Humpback Whale|Cenozoic|Modern|Ocean|Mammal|Flipper bones match mammal forelimbs|Long flippers and bubble-net feeding|Humpback whale
dolphin|Common Bottlenose Dolphin|Cenozoic|Modern|Ocean|Mammal|Mammal lungs and forelimb bones|Echolocation for finding prey|Common bottlenose dolphin
orca|Orca|Cenozoic|Modern|Ocean|Mammal|Toothed whale body traits|Team hunting and powerful tail|Orca
manatee|Manatee|Cenozoic|Modern|Warm coastal water|Mammal|Mammal lungs and flipper bones|Paddle tail and grazing lips|Manatee
seal|Harbor Seal|Cenozoic|Modern|Coasts|Mammal|Mammal forelimb bones|Flippers and blubber for water|Harbor seal
walrus|Walrus|Cenozoic|Modern|Arctic coasts|Mammal|Flipper bones and fur|Tusks and whiskers for feeding|Walrus
polar_bear|Polar Bear|Cenozoic|Modern|Arctic sea ice|Mammal|Bear skull and paws|White fur and fat for cold|Polar bear
brown_bear|Brown Bear|Cenozoic|Modern|Forests and mountains|Mammal|Bear teeth and paws|Omnivore diet and strong claws|Brown bear
giant_panda|Giant Panda|Cenozoic|Modern|Bamboo forest|Mammal|Bear body and skull traits|Pseudo-thumb for gripping bamboo|Giant panda
wolf|Gray Wolf|Cenozoic|Modern|Forests and tundra|Mammal|Canid skull and paws|Pack hunting and endurance running|Wolf
red_fox|Red Fox|Cenozoic|Modern|Forests and towns|Mammal|Canid teeth and paws|Sharp hearing and flexible diet|Red fox
domestic_dog|Domestic Dog|Cenozoic|Modern|Human communities|Mammal|Canid DNA and skull traits|Traits shaped by domestication|Dog
cat|Domestic Cat|Cenozoic|Modern|Human communities|Mammal|Cat claws and teeth|Night vision and stealth hunting|Cat
lion|Lion|Cenozoic|Modern|Savanna|Mammal|Cat skull and retractable claws|Social hunting in prides|Lion
tiger|Tiger|Cenozoic|Modern|Forests and grasslands|Mammal|Cat teeth and claws|Striped camouflage for stalking|Tiger
cheetah|Cheetah|Cenozoic|Modern|Grasslands|Mammal|Cat skeleton and teeth|Long legs and spine for speed|Cheetah
horse|Horse|Cenozoic|Modern|Grasslands|Mammal|Hooves and grazing teeth|Long legs for running|Horse
zebra|Plains Zebra|Cenozoic|Modern|Savanna|Mammal|Horse family hooves and teeth|Stripes and herd behavior|Plains zebra
rhinoceros|White Rhinoceros|Cenozoic|Modern|Grasslands|Mammal|Hoofed mammal limbs|Horn and broad mouth for grazing|White rhinoceros
hippopotamus|Hippopotamus|Cenozoic|Modern|Rivers|Mammal|Hoofed mammal traits|Eyes and nostrils high on head|Hippopotamus
giraffe|Giraffe|Cenozoic|Modern|Savanna woodland|Mammal|Hoofed mammal limbs|Long neck for high leaves|Giraffe
camel|Dromedary Camel|Cenozoic|Modern|Desert|Mammal|Hooves and mammal body systems|Hump fat and water-saving body|Dromedary
llama|Llama|Cenozoic|Modern|Mountains|Mammal|Camelid teeth and feet|Padded feet for rocky ground|Llama
deer|White-tailed Deer|Cenozoic|Modern|Forest edges|Mammal|Hooves and antlers in deer relatives|Speed and camouflage coat|White-tailed deer
bison|American Bison|Cenozoic|Modern|Grasslands|Mammal|Hooves and grazing teeth|Large head for moving snow|American bison
goat|Mountain Goat|Cenozoic|Modern|Mountains|Mammal|Hooves and horns|Split hooves for climbing|Mountain goat
human|Nikola Jokić|Cenozoic|Modern|Many environments|Mammal|Forelimb bones shared with whales and bats|Large brain and tool use|Nikola Jokić
chimpanzee|Chimpanzee|Cenozoic|Modern|Tropical forest|Mammal|Primate hands and DNA similar to humans|Long arms for climbing|Chimpanzee
gorilla|Gorilla|Cenozoic|Modern|Tropical forest|Mammal|Primate hands and forward-facing eyes|Powerful arms for knuckle walking|Gorilla
orangutan|Orangutan|Cenozoic|Modern|Rainforest|Mammal|Primate hands and shoulders|Long arms for tree life|Orangutan
lemur|Ring-tailed Lemur|Cenozoic|Modern|Dry forest|Mammal|Primate hands and eyes|Long tail for balance and signaling|Ring-tailed lemur
sloth|Brown-throated Sloth|Cenozoic|Modern|Rainforest canopy|Mammal|Mammal claws and skeleton|Slow metabolism and hanging claws|Brown-throated sloth
armadillo|Nine-banded Armadillo|Cenozoic|Modern|Grasslands and forests|Mammal|Mammal backbone and claws|Armor plates for protection|Nine-banded armadillo
anteater|Giant Anteater|Cenozoic|Modern|Grasslands|Mammal|Mammal limbs and hair|Long tongue and claws for ants|Giant anteater
bat|Little Brown Bat|Cenozoic|Modern|Night skies|Mammal|Forelimb bones shared with humans and whales|Wings and echolocation|Little brown bat
flying_fox|Flying Fox|Cenozoic|Modern|Tropical forest|Mammal|Bat wing bones|Large eyes and wings for fruit feeding|Flying fox
eagle|Bald Eagle|Cenozoic|Modern|Lakes and coasts|Bird|Feathers and bird skeleton|Talons and sharp vision|Bald eagle
hawk|Red-tailed Hawk|Cenozoic|Modern|Open country|Bird|Feathers and hollow bones|Broad wings for soaring|Red-tailed hawk
owl|Great Horned Owl|Cenozoic|Modern|Forests|Bird|Bird feathers and beak|Silent flight and night vision|Great horned owl
penguin|Emperor Penguin|Cenozoic|Modern|Antarctic coast|Bird|Feathers and bird skeleton|Flipper wings for swimming|Emperor penguin
ostrich|Ostrich|Cenozoic|Modern|Savanna|Bird|Feathers and beak|Long legs for running|Ostrich
emu|Emu|Cenozoic|Modern|Australian grassland|Bird|Feathers and bird skeleton|Flightless running body|Emu
kiwi|Kiwi|Cenozoic|Modern|New Zealand forest|Bird|Feathers and beak|Long beak for ground feeding|Kiwi (bird)
duck|Mallard|Cenozoic|Modern|Wetlands|Bird|Feathers and bill|Webbed feet for swimming|Mallard
goose|Canada Goose|Cenozoic|Modern|Lakes and fields|Bird|Feathers and hollow bones|Migration wings and webbed feet|Canada goose
swan|Mute Swan|Cenozoic|Modern|Lakes|Bird|Feathers and beak|Long neck for aquatic plants|Mute swan
hummingbird|Ruby-throated Hummingbird|Cenozoic|Modern|Gardens and forests|Bird|Feathers and wings|Hovering flight and long bill|Ruby-throated hummingbird
woodpecker|Pileated Woodpecker|Cenozoic|Modern|Forests|Bird|Feathers and claws|Chisel beak and shock-absorbing skull|Pileated woodpecker
flamingo|American Flamingo|Cenozoic|Modern|Salt lagoons|Bird|Feathers and long legs|Filter-feeding bill|American flamingo
albatross|Wandering Albatross|Cenozoic|Modern|Open ocean|Bird|Feathers and hollow bones|Long wings for ocean soaring|Wandering albatross
pelican|Brown Pelican|Cenozoic|Modern|Coasts|Bird|Feathers and beak|Pouch bill for catching fish|Brown pelican
parrot|Scarlet Macaw|Cenozoic|Modern|Rainforest|Bird|Feathers and beak|Strong curved beak for seeds|Scarlet macaw
raven|Common Raven|Cenozoic|Modern|Forests and towns|Bird|Feathers and bird brain traits|Problem solving and varied diet|Common raven
chicken|Chicken|Cenozoic|Modern|Farms|Bird|Feathers and beak|Domesticated egg and body traits|Chicken
alligator|American Alligator|Cenozoic|Modern|Swamps|Reptile|Scales and archosaur traits|Armored body and ambush jaws|American alligator
crocodile|Nile Crocodile|Cenozoic|Modern|Rivers|Reptile|Scales and archosaur ancestry|Eyes high on skull for ambush|Nile crocodile
komodo_dragon|Komodo Dragon|Cenozoic|Modern|Island savanna|Reptile|Monitor lizard skull and scales|Large body and powerful bite|Komodo dragon
iguana|Green Iguana|Cenozoic|Modern|Tropical forest|Reptile|Scales and claws|Long tail and climbing claws|Green iguana
chameleon|Veiled Chameleon|Cenozoic|Modern|Trees|Reptile|Lizard scales and feet|Color change and grasping feet|Veiled chameleon
gecko|Leopard Gecko|Cenozoic|Modern|Desert scrub|Reptile|Lizard body and scales|Sticky or gripping feet and night activity|Leopard gecko
rattlesnake|Western Diamondback Rattlesnake|Cenozoic|Modern|Desert|Reptile|Snake scales and skull|Venom and warning rattle|Western diamondback rattlesnake
python|Burmese Python|Cenozoic|Modern|Wetlands|Reptile|Snake backbone and scales|Constriction for catching prey|Burmese python
cobra|King Cobra|Cenozoic|Modern|Forests|Reptile|Snake skull and scales|Venom and hood display|King cobra
sea_turtle|Green Sea Turtle|Cenozoic|Modern|Ocean|Reptile|Turtle shell and lungs|Flippers for long-distance swimming|Green sea turtle
snapping_turtle|Common Snapping Turtle|Cenozoic|Modern|Freshwater|Reptile|Turtle shell and beak|Strong jaws and rough shell|Common snapping turtle
frog|American Bullfrog|Cenozoic|Modern|Ponds|Amphibian|Four limbs and moist skin|Powerful legs for jumping|American bullfrog
toad|Cane Toad|Cenozoic|Modern|Tropical ground|Amphibian|Amphibian skin and limbs|Poison glands for defense|Cane toad
salamander|Tiger Salamander|Cenozoic|Modern|Wetlands|Amphibian|Four limbs and moist skin|Burrowing and aquatic larvae|Tiger salamander
axolotl|Axolotl|Cenozoic|Modern|Lake water|Amphibian|Salamander body plan|External gills kept into adulthood|Axolotl
newt|Eastern Newt|Cenozoic|Modern|Ponds and forests|Amphibian|Amphibian skin and limbs|Toxic skin and life-stage changes|Eastern newt
great_white_shark|Great White Shark|Cenozoic|Modern|Ocean|Cartilaginous fish|Jaws and fins like shark relatives|Sharp teeth and strong swimming|Great white shark
hammerhead_shark|Great Hammerhead|Cenozoic|Modern|Ocean|Cartilaginous fish|Shark jaws and fins|Wide head for sensing prey|Great hammerhead
stingray|Manta Ray|Cenozoic|Modern|Ocean|Cartilaginous fish|Cartilage skeleton and gills|Wide fins for gliding|Manta ray
salmon|Atlantic Salmon|Cenozoic|Modern|Rivers and ocean|Bony fish|Backbone, gills, and fins|Migration between fresh and salt water|Atlantic salmon
tuna|Bluefin Tuna|Cenozoic|Modern|Open ocean|Bony fish|Fins and gills|Streamlined body for speed|Bluefin tuna
clownfish|Clownfish|Cenozoic|Modern|Coral reefs|Bony fish|Fins and gills|Mucus protection in anemones|Amphiprioninae
seahorse|Seahorse|Cenozoic|Modern|Seagrass beds|Bony fish|Gills and fin rays|Curled tail and camouflage|Seahorse
eel|Moray Eel|Cenozoic|Modern|Coral reefs|Bony fish|Backbone and gills|Long body for hiding in crevices|Moray eel
anglerfish|Humpback Anglerfish|Cenozoic|Modern|Deep sea|Bony fish|Gills and fins|Glowing lure for prey|Humpback anglerfish
octopus|Common Octopus|Cenozoic|Modern|Ocean floor|Mollusk|Soft body and tentacles|Camouflage and problem solving|Common octopus
squid|Giant Squid|Cenozoic|Modern|Deep ocean|Mollusk|Tentacles and soft body|Huge eyes for deep sea|Giant squid
cuttlefish|Common Cuttlefish|Cenozoic|Modern|Coastal seafloor|Mollusk|Tentacles and beak|Rapid color change|Common cuttlefish
nautilus|Chambered Nautilus|Cenozoic|Modern|Deep reef slopes|Mollusk|Shell and tentacles like ancient cephalopods|Chambered shell for buoyancy|Nautilus pompilius
crab|Blue Crab|Cenozoic|Modern|Coastal water|Arthropod|Jointed limbs and exoskeleton|Paddle legs for swimming|Callinectes sapidus
lobster|American Lobster|Cenozoic|Modern|Cold seafloor|Arthropod|Jointed limbs and exoskeleton|Large claws for defense and feeding|American lobster
horseshoe_crab|Atlantic Horseshoe Crab|Cenozoic|Modern|Coastal shallows|Arthropod|Hard exoskeleton and jointed legs|Helmet shell and spawning behavior|Atlantic horseshoe crab
dragonfly|Green Darner|Cenozoic|Modern|Ponds and wetlands|Arthropod|Six legs and wings|Large eyes and fast flight|Green darner
butterfly|Monarch Butterfly|Cenozoic|Modern|Fields|Arthropod|Six legs and wings|Migration and warning colors|Monarch butterfly
bee|Western Honey Bee|Cenozoic|Modern|Flowers and hives|Arthropod|Six legs and wings|Pollen baskets and social colonies|Western honey bee
ant|Leafcutter Ant|Cenozoic|Modern|Tropical forest|Arthropod|Six legs and exoskeleton|Fungus farming colony behavior|Leafcutter ant
beetle|Hercules Beetle|Cenozoic|Modern|Rainforest|Arthropod|Six legs and hard wing covers|Large horns for competition|Hercules beetle
grasshopper|Migratory Locust|Cenozoic|Modern|Grasslands|Arthropod|Six legs and exoskeleton|Jumping legs and swarming|Migratory locust
spider|Black Widow Spider|Cenozoic|Modern|Web shelters|Arthropod|Eight legs and exoskeleton|Venom and silk web|Latrodectus
scorpion|Emperor Scorpion|Cenozoic|Modern|Tropical forest floor|Arthropod|Eight legs and exoskeleton|Pincers and stinger|Emperor scorpion
starfish|Common Starfish|Cenozoic|Modern|Rocky seafloor|Echinoderm|Radial body plan and tube feet|Regrowing arms|Common starfish
sea_urchin|Purple Sea Urchin|Cenozoic|Modern|Kelp forests|Echinoderm|Spiny skin and tube feet|Spines for defense|Strongylocentrotus purpuratus
jellyfish|Moon Jellyfish|Cenozoic|Modern|Ocean|Cnidarian|Radial body and stinging cells|Transparent bell for drifting|Aurelia aurita
coral|Staghorn Coral|Cenozoic|Modern|Coral reefs|Cnidarian|Stinging polyps like jellyfish relatives|Branching skeleton builds reef habitat|Staghorn coral
sea_anemone|Sea Anemone|Cenozoic|Modern|Tide pools and reefs|Cnidarian|Stinging cells and radial body|Tentacles for catching prey|Sea anemone
sponge|Giant Barrel Sponge|Cenozoic|Modern|Coral reefs|Sponge|Simple multicellular animal body|Filter feeding through pores|Giant barrel sponge
earthworm|Common Earthworm|Cenozoic|Modern|Soil|Annelid|Segmented body|Burrowing body for soil life|Lumbricus terrestris
velvet_worm|Velvet Worm|Cenozoic|Modern|Moist forests|Onychophoran|Many soft legs like ancient relatives|Sticky slime for catching prey|Onychophora
tardigrade|Tardigrade|Cenozoic|Modern|Moss and water films|Microscopic animal|Segmented body with tiny legs|Dormant state survives extremes|Tardigrade
water_bear|Milnesium Tardigradum|Cenozoic|Modern|Moss and lichens|Microscopic animal|Tiny legs and segmented body|Survives drying and freezing|Milnesium tardigradum
bacteria|Bacteria|Early life|Single-cell life|Water, soil, bodies, and many extreme places|Single-celled organism|Cell membrane, DNA, and basic life processes|Tiny single cells reproduce quickly|Bacteria
archaea|Archaea|Early life|Single-cell life|Hot springs, salt lakes, oceans, and soil|Single-celled organism|Cell membrane, DNA, and metabolism|Some live in extreme heat, salt, or acid|Archaea
cyanobacteria|Cyanobacteria|Early life|Single-cell life|Water and wet surfaces|Single-celled organism|Cells with DNA and membranes|Photosynthesis uses sunlight to make food|Cyanobacteria
amoeba|Amoeba|Early life|Single-cell life|Freshwater, soil, and wet places|Single-celled organism|One cell with nucleus and cell membrane|Changes shape to move and eat|Amoeba
paramecium|Paramecium|Early life|Single-cell life|Freshwater ponds|Single-celled organism|One cell with nucleus and membrane|Tiny hairs called cilia help it move|Paramecium
euglena|Euglena|Early life|Single-cell life|Freshwater|Single-celled organism|One cell with nucleus and membrane|Can use sunlight and also take in food|Euglena
yeast|Yeast|Early life|Single-cell life|Fruit, soil, and sugary places|Single-celled fungus|Cells with nucleus and membrane|Breaks down sugar for energy|Yeast
diatom|Diatom|Early life|Single-cell life|Oceans and lakes|Single-celled algae|One cell with DNA and membrane|Glass-like shell protects the cell|Diatom
green_algae|Green Algae|Early life|Single-cell life|Freshwater and wet places|Simple algae|Cells with chloroplasts and DNA|Uses sunlight to make food|Green algae
volvox|Volvox|Early life|Single-cell life|Freshwater ponds|Simple algae colony|Many similar cells work together|Forms a rolling ball-shaped colony|Volvox
choanoflagellate|Choanoflagellate|Early life|Single-cell life|Water|Single-celled organism|Cell parts similar to animal cell relatives|Tail-like flagellum helps move water and catch food|Choanoflagellate
stromatolite|Stromatolite|Early life|Single-cell life|Shallow water|Microbial community|Layers made by tiny living cells|Layered mats helped change early Earth air|Stromatolite
`.trim();

export const animals: Animal[] = rows.split("\n").map((row) => {
  const [key, name, era, period, environment, lineage, sharedTrait, adaptation, wikiTitle] = row.split("|");
  return { key, name, era, period, environment, lineage, sharedTrait, adaptation, wikiTitle };
});

export const periods = Array.from(new Set(animals.map((animal) => animal.period))).sort();
export const lineages = Array.from(new Set(animals.map((animal) => animal.lineage))).sort();
