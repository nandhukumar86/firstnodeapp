const axios = require('axios');

const integrationApiClient = axios.create({
    baseURL: 'https://apihub.document360.net/v1',
    headers: { 'Content-Type': 'application/json', 'api_token': '/KPDRCQ8AAGm3dOkXdO5h8Z6CNeHCV2WObdv35iS0K/UzAcsHkG22QyEVI4CZs2Y4OCZkA5HXV2SS626hUFu326SmkYCuQ2WmbdOG9xYMZSN+Kp4/NKSlejoy1hbVsfu++CN9u3+gC7RyeL8wPvNzg==' }
});

Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
  }

const titles = [
    "Welcome", "How to start?", "Installation Guide", "Theory of Relativity",
    "Sports News", "Particle Theory", "Team work - the best Guide", "Corona Outbreak",
    "Introduction to Computers", "Conclusion",
    "Getting things done","Eat the frog","Think Big","Global Warming"
]

const contents = [
    "Wikis are enabled by wiki software, otherwise known as wiki engines. A wiki engine, being a form of a content management system, differs from other web-based systems such as blog software, in that the content is created without any defined owner or leader, and wikis have little inherent structure, allowing structure to emerge according to the needs of the users.[1] Wiki engines usually allow content to be written using a simplified markup language and sometimes edited with the help of a rich-text editor.[2] There are dozens of different wiki engines in use, both standalone and part of other software, such as bug tracking systems. Some wiki engines are open source, whereas others are proprietary. Some permit control over different functions (levels of access); for example, editing rights may permit changing, adding, or removing material. Others may permit access without enforcing access control. Other rules may be imposed to organize content.",
    "Physicists have experimentally confirmed virtually every prediction made by general relativity and quantum mechanics when in their appropriate domains of applicability[citation needed]. Nevertheless, general relativity and quantum mechanics are mutually incompatible – they cannot both be right[citation needed]. Since the usual domains of applicability of general relativity and quantum mechanics are so different, most situations require that only one of the two theories be used.[4][5]:842–844 As it turns out, this incompatibility between general relativity and quantum mechanics is only an issue in regions of extremely small scale - the Planck scale - such as those that exist within a black hole or during the beginning stages of the universe (i.e., the moment immediately following the Big Bang). To resolve the incompatibility, a theoretical framework revealing a deeper underlying reality, unifying gravity with the other three interactions, must be discovered to harmoniously integrate the realms of general relativity and quantum mechanics into a seamless whole: the TOE is a single theory that, in principle, is capable of describing all phenomena in the universe.",
    "Ancient Babylonian astronomers studied the pattern of the Seven Classical Planets against the background of stars, with their interest being to relate celestial movement to human events (astrology), and the goal being to predict events by recording events against a time measure and then look for recurrent patterns. The debate between the universe having either a beginning or eternal cycles can be traced back to ancient Babylonia.[9]",
    "Archimedes was possibly the first philosopher to have described nature with axioms (or principles) and then deduce new results from them. Any theory of everything is similarly expected to be based on axioms and to deduce all observable phenomena from them.[10]:340 The scientific method emphasizing precise observation and controlled experimentation was largely developed in the science of the Islamic world, by Arabic alchemists and particularly the Arab physicist Ibn al-Haytham, who proposed that rays of light were streams of tiny particles travelling in straight lines at a finite velocity.[9] Arabic alchemists proposed the theory of corpuscularianism, where unified sulfur and mercury corpuscles (particles), differing in purity, size, and relative proportions, form the basis of a much more complicated process.[11][12]",
    "Laplace thus envisaged a combination of gravitation and mechanics as a theory of everything. Modern quantum mechanics implies that uncertainty is inescapable, and thus that Laplace's vision has to be amended: a theory of everything must include gravitation and quantum mechanics. Even ignoring quantum mechanics, chaos theory is sufficient to guarantee that the future of any sufficiently complex mechanical or astronomical system is unpredictable.",
    "In the twentieth century, the search for a unifying theory was interrupted by the discovery of the strong and weak nuclear forces (or interactions), which differ both from gravity and from electromagnetism. A further hurdle was the acceptance that in a TOE, quantum mechanics had to be incorporated from the start, rather than emerging as a consequence of a deterministic unified theory, as Einstein had hoped.",
    "Gravity and electromagnetism could always peacefully coexist as entries in a list of classical forces, but for many years it seemed that gravity could not even be incorporated into the quantum framework, let alone unified with the other fundamental forces.",
    "A Theory of Everything would unify all the fundamental interactions of nature: gravitation, strong interaction, weak interaction, and electromagnetism. Because the weak interaction can transform elementary particles from one kind into another, the TOE should also yield a deep understanding of the various different kinds of possible particles.",
    "The final step in the graph requires resolving the separation between quantum mechanics and gravitation, often equated with general relativity. Numerous researchers concentrate their efforts on this specific step; nevertheless, no accepted theory of quantum gravity – and thus no accepted theory of everything – has emerged yet. It is usually assumed that the TOE will also solve the remaining problems of GUTs.",
    "A surprising property of string/M-theory is that extra dimensions are required for the theory's consistency. In this regard, string theory can be seen as building on the insights of the Kaluza–Klein theory, in which it was realized that applying general relativity to a five-dimensional universe (with one of them small and curled up)[clarification needed] looks from the four-dimensional perspective like the usual general relativity together with Maxwell's electrodynamics. This lent credence to the idea of unifying gauge and gravity interactions, and to extra dimensions, but did not address the detailed experimental requirements",
    "One proposed solution is that many or all of these possibilities are realised in one or another of a huge number of universes, but that only a small number of them are habitable. Hence what we normally conceive as the fundamental constants of the universe are ultimately the result of the anthropic principle rather than dictated by theory. This has led to criticism of string theory,[33] arguing that it cannot make useful (i.e., original, falsifiable, and verifiable) predictions and regarding it as a pseudoscience. Others disagree,[34] and string theory remains an active topic of investigation in theoretical physics.[35]",
    "This model leads to an interpretation of electric and colour charge as topological quantities (electric as number and chirality of twists carried on the individual ribbons and colour as variants of such twisting for fixed electric charge).",
    "Another theory is called Causal Sets. As some of the approaches mentioned above, its direct goal isn't necessarily to achieve a TOE but primarily a working theory of quantum gravity, which might eventually include the standard model and become a candidate for a TOE. Its founding principle is that spacetime is fundamentally discrete and that the spacetime events are related by a partial order. This partial order has the physical meaning of the causality relations between relative past and future distinguishing spacetime events.",
    "Christoph Schiller's Strand Model attempts to account for the gauge symmetry of the Standard Model of particle physics, U(1)×SU(2)×SU(3), with the three Reidemeister moves of knot theory by equating each elementary particle to a different tangle of one, two, or three strands (selectively a long prime knot or unknotted curve, a rational tangle, or a braided tangle respectively).[42]",
]

integrationApiClient.get('/ProjectVersions')
    .then(res => {
        return Promise.all(res.data.data.map(v => integrationApiClient.get(`/ProjectVersions/${v.id}/articles`)))
    })
    .then(versions => {
        data = []
        versions.forEach(version => {
            version.data.data.forEach(article => {

                _title = titles.random();
                _content = contents.random();
                integrationApiClient.put(`/Articles/${article.id}`, {title : _title, content : _content})
                integrationApiClient.put(`/Articles/${article.id}/fr`, {title : _title, content : _content})

            })
        });
    })


