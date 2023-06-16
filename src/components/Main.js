import { Configuration, OpenAIApi } from "openai"
import { useState } from "react"
import awesomo from "../assets/awesomo.webp"
import Loader from "./loader"
import { FaMagic } from "react-icons/fa"
import { IoReloadCircleSharp } from "react-icons/io5"
import "./main.css"

const Main = () => {
  const [outline, setOutline] = useState(undefined);
  const [botReply, setBotReply] = useState(`Greetings Butters!👋 I'm the AWESOM-O 4000. Give me a movie concept in one sentence, 
  and I'll create a movie title, a synopsis, a movie poster... AND I even pick the cast for you!🍿 Please enter you API key to start!🔑` );
  const [loadingBotReply, setLoadingBotReply] = useState(false);
  const [hideInput, setHideInput] = useState(false);
  const [movieImage, setMovieImage] = useState(undefined);
  const [movieTitle, setMovieTitle] = useState(undefined);
  const [displayPitch, setDisplayPitch] = useState(false);
  const [actors, setActors] = useState(undefined);
  const [synopsis, setSynopsis] = useState(undefined);
  const [userKey, setUserKey] = useState("");
  const [isFocused, setIsFocused] = useState(undefined);
  const [hideKey, setHideKey] = useState(false);
  const configuration = new Configuration({
    apiKey: userKey,
  }
  );
  const openai = new OpenAIApi(configuration);
  const fecthBotReply = async (e) => {
    setLoadingBotReply(true);
    e.preventDefault();
    try {
      const res = await openai.createCompletion({
        model: "text-babbage-001",
        prompt: `Generate a short message to say an outline sounds interesting and that you need some seconds to think about it.
        ###
        outline: Two dogs fall in love and move to Hawaii to learn how to surf.
        message: That sounds interesting. I'll need to think about that. I love the bit about Hawaii!
        ###
        outline: A rat in Spain who loves football train really hard to become a professional player.
        message: I'll spend some seconds to think about that. But it is a really interesting idea. A rat playing football lol!
        ### 
        outline: A movie about a drug traffic between mexico and usa
        message: That sounds interesting. I'll need to think about that. Mexico ehh?
        ###
  
        outline: ${outline},
        message:
        `,
        max_tokens: 60,
      });
      setBotReply(res.data.choices[0].text.trim());
      setLoadingBotReply(false);
    } catch (error) {
      setBotReply("Please check your API key🔑, you either provided a wrong code or you do not have credits😿");
      setLoadingBotReply(false);
    }
  };

  const fetchSynopsis = async (e) => {
    e.preventDefault();
    setHideInput(true);
    const res = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Generate an engaging, professional and marketable movie based on an outline 
      ###
      outline: "A movie about a drug traffic between mexico and usa"
      synopsis copy: A look at America's war on drugs through several interconnected stories: Ohio's Supreme Court judge (Michael Douglas) is 
      appointed as the nation's Drug Tsar, unaware that his own daughter is a heroin addict, two DEA agents pursue the wife 
      of a jailed drugs baron who seeks to control his lucrative business, and a Mexican cop (Binicio Del Toro) takes a lone stand against the 
      powerful cartels in his community.
      ###
      outline: "A movie about a cyborg federal agent who trails a hacker"
      synopsis copy: cyborg federal agent Maj. Motoko Kusanagi (Scarlet Johanson) trails "The Puppet Master" (Abe Lasser), who illegally 
      hacks into the computerized minds of cyborg-human hybrids. Her pursuit of a man who can modify the identity of strangers leaves 
      Motoko pondering her own makeup and what life might be like if she had more human traits. 
      ###
  
      outline: ${outline}
      synopsis copy:
      `,
      max_tokens: 400,
    });
    const synopsis = res.data.choices[0].text.trim();
    setSynopsis(synopsis);
    fetchTitle(e, synopsis);
    fetchStars(synopsis);
    fetchImagePrompt(movieTitle, synopsis);
  }

  const fetchTitle = async (e, synopsis) => {
    e.preventDefault();
    const res = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Generate an engaging and marketable movie title based on a synopsis. The synopsis should include actors names suitable for the roles 
    and should be written in brackets after each movie character
    ###
    synopsis: A movie about a cyborg federal agent who trails a hacker"
    synopsis copy: cyborg federal agent Maj. Motoko Kusanagi (Scarlet Johanson) trails "The Puppet Master" (Abe Lasser), who illegally 
    hacks into the computerized minds of cyborg-human hybrids. Her pursuit of a man who can modify the identity of strangers leaves 
    Motoko pondering her own makeup and what life might be like if she had more human traits. With her partner (Richard George), 
    she corners the hacker, but her curiosity about her identity sends the case in an unforeseen direction.
    title: Ghost in the Shell
    ###
    synopsis: Chuck Noland (Tom Hanks) is a FedEx systems analyst and executive who travels the world resolving productivity problems. He lives with 
    his girlfriend, Kelly Frears (Kate Winslet) in Memphis, Tennessee. During a Christmas dinner, where family tease Kelly and Chuck about if they will 
    ever finally get married, Chuck is summoned to resolve a problem in Malaysia. Before leaving, Kelly gifts Chuck her grandfather’s pocket 
    watch with a photo of her in it. Chuck gifts her a small box, saying she can wait to open it when he returns. It is implied it is an 
    engagement ring. However, the FedEx cargo plane he is on gets caught in a storm and crashes into the Pacific Ocean. Chuck is the only 
    survivor of the crash and escapes on an inflatable life raft, losing the emergency locator transmitter in the process. The next day, 
    he washes up on an uninhabited island.
    title: Cast Away
    ###
    synopsis: ${synopsis} 
    title: 
    `,
      max_tokens: 25,
      temperature: 0.5,
    });
    const title = res.data.choices[0].text.trim();
    setMovieTitle(title);
  }


  const fetchStars = async (synopsis) => {
    const res = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Get the actors names inside the synopsis text 
    ###
    synopsis: cyborg federal agent Maj. Motoko Kusanagi (Scarlet Johanson) trails "The Puppet Master" (Abe Lasser), who illegally 
    hacks into the computerized minds of cyborg-human hybrids. Her pursuit of a man who can modify the identity of strangers leaves 
    Motoko pondering her own makeup and what life might be like if she had more human traits. With her partner (Richard George), 
    she corners the hacker, but her curiosity about her identity sends the case in an unforeseen direction.
    actors: Scarlett Johanson, Abe Lesser, Richard George
    ###
    synopsis: Chuck Noland (Tom Hanks) is a FedEx systems analyst and executive who travels the world resolving productivity problems. He lives with 
    his girlfriend, Kelly Frears (Kate Winslet) in Memphis, Tennessee. During a Christmas dinner, where family tease Kelly and Chuck about if they will 
    ever finally get married, Chuck is summoned to resolve a problem in Malaysia. Before leaving, Kelly gifts Chuck her grandfather’s pocket 
    watch with a photo of her in it. Chuck gifts her a small box, saying she can wait to open it when he returns. It is implied it is an 
    engagement ring. However, the FedEx cargo plane he is on gets caught in a storm and crashes into the Pacific Ocean. Chuck is the only 
    survivor of the crash and escapes on an inflatable life raft, losing the emergency locator transmitter in the process. The next day, 
    he washes up on an uninhabited island.
    actors: Tom hanks, Kate Winslet
    ###

    synopsis: ${synopsis},
    actors:
    `,
      max_tokens: 30,
    })
    setActors(res.data.choices[0].text.trim());
  }

  const fetchImagePrompt = async (title, synopsis) => {
    const res = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Give a short description of an image which could be used to advertise a movie based on a title and a synopsis.
      The description shoud be rich in visual detail but contain no text. 
      ###
      title: Love's Time Warp
      synopsys: When scientist and time traveller Wendy (Emma Watson) is sent back to the 1920's to a assissinate a future dictator,
      she never expected to fall in love with him. As Wendy infiltrates the dictator's inner circle, she must choose between her mission
      and her heart. With the help of a mysterious stranger (Tom Hanks), Wendy must decide whether to save the world or save her love.
      image-description: A silhoutted figure stands in the shadow of a 1920's speakeasy, her face turned away from the camera.
      In the background, two people are dancing in the dim light, one wearing a flapper-style dress and the other wearing a dapper suit.
      A semi-transparent image of war is super-imposed over the scene.
      ###
      title: Far East of Love
      synopsys: Two strangers, Hank (Daniel Craig) and Rei (Ming-Na Wen), meet in Japan and form a whirlwind romance. 
      Hank struggles with the idea of settling down in this unfamiliar environment, while Rei battles social expectations and finds 
      herself having to choose between Hank and her family traditions. They take a journey of self-discovery in an attempt to make 
      their relationship work, navigating the divide between two very different cultures.
      image-description: A silhoutted figure of a couple holding hands facing tokyo sunset. The sun is setting behind the city skyline.
      ###

      title: ${title}
      synopsis: ${synopsis}
      image_prompt:
    `,
      temperature: 0.8,
      max_tokens: 150,
    })
    const imagePrompt = res.data.choices[0].text.trim();
    fetchImageUrl(imagePrompt)
  };

  const fetchImageUrl = async (imagePrompt) => {
    const res = await openai.createImage({
      prompt: `${imagePrompt}, there should be no text in this image`,
      n: 1,
      size: '256x256',
      response_format: 'url',
    });
    setMovieImage(res.data.data[0].url);
  };

  return (
    <div className="flex flex-col h-[80%] justify-center items-center">
      {!displayPitch && (
        <>
          <div className="dialog mx-2 px-2 pt-1 bg-[#FFEEC3] pb-7 mt-2 shadow-lg z-10 font-southpark w-full md:w-1/2 xl:w-1/3">
            <h1>
              {loadingBotReply ? <Loader /> : botReply}
            </h1>
          </div>

          <div className="flex justify-center items-center h-[450px] overflow-hidden w-full relative">
            <img src={awesomo} alt="awesomo" className="flex h-full scale-[125%]" />
            <input
              className={`border border-slate-200 rounded-md flex-1 p-3 shadow-lg resize-none ${hideKey && "hidden"} md:w-1/2
              w-5/6 lg:w-1/3 outline-none absolute bottom-2 h-10 ${!isFocused && isFocused !== undefined && userKey.length !== 0 && "blur-sm"}`}
              placeholder="API key here. This isn't stored remotely"
              onChange={(e) => setUserKey(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </div>
        </>
      )}

      {!hideInput && (
        <form className="h-28 w-full px-2 mb-2 md:flex md:justify-center items-center">
          <div className="flex h-full md:w-1/2 xl:w-1/3">
            <textarea
              className="border border-slate-200 rounded-tl-md rounded-bl-md flex-1 h-full p-3 shadow-lg resize-none outline-none"
              placeholder="An man finds a remote control that allows him to fast forward and rewind to different parts of his life."
              onChange={(e) => setOutline(e.target.value)}
            />
            <button
              className="bg-[#EE3253] border-b-4 border-l-2 border-red-900 w-16 flex justify-center items-center cursor-pointer hover:bg-red-800"
              onClick={(e) => {
                if (userKey === "") {
                  e.preventDefault();
                  setBotReply("Butters you forgot to enter your credentials 🔑, Please enter your openai API key to start! 🤖 Don't worry I do not store data, your key is safe 🫶");
                  return;
                } else {
                  fecthBotReply(e);
                  fetchSynopsis(e);
                  setHideKey(true);
                }
              }}
            >
              <FaMagic size={40} />
            </button>
          </div>
        </form>
      )
      }

      {
        hideInput && movieImage === undefined && (
          <div className="flex flex-col justify-center">
            <span className="text-2xl">🤖</span>
            <p className="text-[#00B8C4] font-southpark animate-pulse mb-5">
              Hold on, Im creating your movie idea...
            </p>
          </div>
        )
      }

      {
        movieImage && (
          <button
            className="py-4 px-8 rounded-xl bg-[#00B8C4] hover:bg-[#302E3C] cursor-pointer mb-4 font-southpark"
            onClick={(e) => {
              setDisplayPitch(!displayPitch)
              e.target.className = "hidden"
            }}
          >
            Reveal Movie Idea 🎁
          </button>
        )
      }

      <div>
        {displayPitch && (
          <div className="flex flex-col justify-center items-center px-4">
            <div className="flex w-full h-[18rem] sm:w-1/2 md:w-[40%] mb-2">
              <img src={movieImage} alt="movie-poster" className="w-full rounded-xl shadow-lg object-cover" />
            </div>
            <h1 className="text-xl w-full sm:w-1/2 md:text-2xl font-semibold text-slate-700">{movieTitle}</h1>
            <h2 className="text-lg text-slate-600 font-light">{actors}</h2>
            <p className="text-justify text-slate-800 mt-2 font-light sm:w-1/2">{synopsis}</p>
            <IoReloadCircleSharp
              size={50}
              className="absolute top-4 right-4 cursor-pointer hover:scale-105"
              onClick={() => {
                setMovieImage(!movieImage);
                setDisplayPitch(!displayPitch);
                setHideInput(!hideInput);
                setBotReply(`Greetings! I'm the AWESOM-O 4000. Give me a movie concept in one sentence,
                and I'll create a movie title, a synopsis, a movie poster... AND I even pick the cast for you!`);
                setHideInput(false);
              }}
            />
          </div>
        )}
      </div>
    </div >
  )
}

export default Main;
