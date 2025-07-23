import { IMAGE } from "../constent/theme";

const ourTeam = [
  { img: IMAGE.our_teamePic1, name: "João Pereira" },
  { img: IMAGE.our_teamePic2, name: "Carlos Mendes" },
  { img: IMAGE.our_teamePic3, name: "Miguel Rocha" },
  { img: IMAGE.our_teamePic4, name: "Eduardo Lima" },
];

const AboutOurTeam = () => {
  return (
    <div className="row">
      {ourTeam.map((item, index) => (
        <div className="col-lg-3 col-md-6 col-sm-6 mb-6" key={index}>
          <div className="service-box text-center p-4 shadow rounded hover:shadow-lg transition-all duration-300">
            <div className="service-images mb-4">
              <img
                src={item.img}
                alt={item.name}
                className="rounded-full w-[200px] h-[200px] object-cover mx-auto"
              />
            </div>
            <div className="service-content">
              <h6 className="text-xl font-bold text-black uppercase mb-2">
                {item.name}
              </h6>
              <p className="text-sm text-gray-700">
                Barbeiro especializado em cortes clássicos e modernos, sempre
                pronto para realçar o seu estilo com precisão e atenção aos
                detalhes.
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AboutOurTeam;
