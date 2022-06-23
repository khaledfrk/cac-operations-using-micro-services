package com.example.msoperation;

import com.example.msoperation.DOA.*;
import com.example.msoperation.Entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

import javax.persistence.Embedded;
import java.io.Serializable;
import java.sql.Date;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;


@SpringBootApplication
public class MsOperationApplication implements CommandLineRunner {
    @Autowired
    PatientRepository patientRepository;
    @Autowired
    OperationRepository operationRepository;
    @Autowired
    DetailsRepository detailsRepository;
    @Autowired
    PersonnelRepository personnelRepository;
    @Autowired
    PersonConfidenceRepository personConfidenceRepository;
    @Autowired
    SalleOperatoireRepository salleOperatoireRepository;
    @Autowired
    ProductRepo pro;

    public static void main(String[] args) {
        SpringApplication.run(MsOperationApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {


        Patient p1, p2;
        Operation o1, o2, o3;
        PersonConfidence percf1, percf2;
        Personnel ch1,ch2,ch3, ch4,ch5,ch6,ch7,ch8;
        SalleOperatoire s1, s2, s3;
        Reveil rev1, rev2, rev3;
        Adresse adr1, adr2;
        ProtocoleOperatoire proOp1,proOp2,proOp3;
        ProtocoleAnesthesie proAn1,proAn2,proAn3;
        CurageGanglionnaire curage1,curage2,curage3;
        DrainageExterne Drainage1,Drainage2,Drainage3;
        PiecesPrelevees Pieces1,Pieces2,Pieces3;
        //Chirurgien_resident chirugien1;
/*
        adr1 = new Adresse("alger","el harrach","el harrach");
        adr2 = new Adresse("medea","el azizia","mihoub");

        s1 = salleOperatoireRepository.save(new SalleOperatoire(null,"A",4,null));
        s2 = salleOperatoireRepository.save(new SalleOperatoire(null,"B",3,null));
        s3 = salleOperatoireRepository.save(new SalleOperatoire(null,"C",2,null));


        rev1 = new Reveil("r1",4,"",
                LocalDateTime.of(2022,02,22,12,55,01),
                LocalDateTime.of(2022,02,22,15,55,01));
        rev2 = new Reveil("r2",4,"",
                LocalDateTime.of(2022,02,12,12,18,01),
                LocalDateTime.of(2022,02,13,10,30,01));
        rev3 = new Reveil("r3",1,"",
                LocalDateTime.of(2022,02,22,12,55,01),
                LocalDateTime.of(2022,02,22,15,50,01));

        curage1 = new CurageGanglionnaire("aaa","bbb","ccc");
        curage2 = new CurageGanglionnaire("dd","eee","fff");
        curage3 = new CurageGanglionnaire("ggg","hhh","iii");

        Drainage1 = new  DrainageExterne("Drainage1",10, "topo1");
        Drainage2 = new  DrainageExterne("Drainage2",3, "topo1");
        Drainage3 = new  DrainageExterne("Drainage3",5, "topo1");

        Pieces1 = new PiecesPrelevees("jssp",20.0,"Orientation1",1,"TypeFixation1");
        Pieces2 = new PiecesPrelevees("jssp",30.0,"Orientation2",2,"TypeFixation2");
        Pieces3 = new PiecesPrelevees("jssp",40.0,"Orientation3",3,"TypeFixation3");


        proOp1 = new ProtocoleOperatoire(15.0,"jssp","loc1","zone1",
                "Lymph1","DécubitusLatéral_D","Totale",
                "horizontale",curage1 ,Drainage1, "lesionsLaissees1",Pieces1);
        proOp2 = new ProtocoleOperatoire(20.0,"jssp","loc2","zone2",
                "Lymph2","DécubitusLatéral_D","Totale",
                "J",curage2,Drainage2, "lesionsLaissees2",Pieces2);
        proOp3 = new ProtocoleOperatoire(25.0,"jssp","loc3","zone3",
                "Lymph3","DécubitusVentral","Partielle",
                "T",curage3, Drainage3,"lesionsLaissees3",Pieces3);


        proAn1 = new ProtocoleAnesthesie("tech1","bras","materiel1",
                "hypnotique","nature1",10.0,10.0);
        proAn2 = new ProtocoleAnesthesie("tech2","bras","materiel2",
                "morphinique","nature2",10.0,10.0);
        proAn3 = new ProtocoleAnesthesie("tech2","bras","materiel3",
                "halogéné","nature3",10.0,10.0);



        p1 = patientRepository.save(new Patient(null,"med","amine", Sexe.Homme,25,
                Date.valueOf("1999-01-01"),"alger","prof",2345678,3456,1234567 ,adr1,
                SituationFamiliale.Celibataire,"A+",170.0,70.0,"mna3rf",null,null));

        p2 = patientRepository.save(new Patient(null,"tales","siham", Sexe.Femme,26,
                Date.valueOf("2000-01-01"),"chlef","prof",2345678,3456,1234567 ,adr1,
                SituationFamiliale.Divorce,"A+",170.0,70.0,"mna3rf",null,null));

        percf1 = personConfidenceRepository.save(new PersonConfidence(null,"bbbb","salah",2345678,adr2,p1));
        percf2 = personConfidenceRepository.save(new PersonConfidence(null,"cccc","sirine",2345678,adr2,p2));

        ch1 = personnelRepository.save( new Personnel(null, "khalfi",
                "sirine",2345678, adr1,"admin" ,"admin","ROLE_ADMIN",
                Date.valueOf("1999-01-01"), Sexe.Homme,
                SituationFamiliale.Celibataire,State.ACTIVE, 3456, 1234567, 25,null));

        ch2 = personnelRepository.save( new Personnel(null, "khatir",
                "abd",2345678, adr1,"user" ,"pwd","ROLE_CHIRUGIEN",Date.valueOf("1999-01-01"), Sexe.Homme,
                SituationFamiliale.Celibataire,State.ACTIVE, 3456, 1234567, 25,null));

        ch3 = personnelRepository.save( new Personnel(null, "khalfi",
                "aymen",2345678, adr1,"u" ,"pwd","ROLE_COORDINATEUR",Date.valueOf("1999-01-01"), Sexe.Homme,
                SituationFamiliale.Celibataire,State.ACTIVE, 3456, 1234567, 25,null));

        ch4 = personnelRepository.save( new Personnel(null, "farek",
                "khaled",2345678, adr1,"a" ,"pwd","ROLE_ANESTHESISTE",Date.valueOf("1999-01-01"), Sexe.Homme,
                SituationFamiliale.Celibataire,State.ACTIVE, 3456, 1234567, 25,null));

 */
/*
        ch5 = personnelRepository.save( new Personnel(null, "abbaci",
                "rania",2345678, adr1,"use5" ,"pwd","Instrumentiste","professeur",Date.valueOf("1999-01-01"), Sexe.Homme,
                SituationFamiliale.Celibataire,State.ACTIVE, 3456, 1234567, 25,null));

        ch6 = personnelRepository.save( new Personnel(null, "khaldi",
                "hamid",2345678, adr1,"u6" ,"pwd","Chirigien","professeur",Date.valueOf("1999-01-01"), Sexe.Homme,
                SituationFamiliale.Celibataire,State.ACTIVE, 3456, 1234567, 25,null));

       // List<Personnel> l1= new ArrayList<>();
       // l1.add(ch1);
        //l1.add(ch2);

        List<Personnel> l2= new ArrayList<>();
        l2.add(ch2);
        List<Personnel> l3= new ArrayList<>();
        l3.add(ch3);
        List<Personnel> l4= new ArrayList<>();
        */


/*
        o1 = operationRepository.save(new Operation(null,s1,TypeOperation.Ovaire,
                Timestamp.valueOf("2018-09-01 09:01:15"),Timestamp.valueOf("2018-09-01 12:21:15"),
                null,p1,l1,false,false,false));

        o2 = operationRepository.save(new Operation(null,s2,TypeOperation.Colon,
                Timestamp.valueOf("2019-09-01 09:01:15"),Timestamp.valueOf("2018-09-01 12:21:15"),
                null,p2,null,false,false,false));
*/
/*
        o3 = operationRepository.save(new Operation(null,s3,TypeOperation.Estomac,
                Timestamp.valueOf("2019-09-01 09:01:15"),Timestamp.valueOf("2018-09-01 12:21:15"),null,p1,l3));

        Details d1 = detailsRepository.save(new Details(null,null,
                null,null,proOp1,proAn1,rev1,"accident1" ,"incident1" ,null,null));

        Details d2 = detailsRepository.save(new Details(null,null,
                null,null,proOp2,proAn2,rev2,"accident2","incident2",o2,null));

        Details d3 = detailsRepository.save(new Details(null,
                LocalDateTime.of(2022,02,22,10,45,01),
                LocalDateTime.of(2022,02,22,12,55,01),
                null,proOp3,proAn3,rev3,"accident3","incident3",o3,null));

        Details d3 = detailsRepository.save(new Details(null,
                null,
                null,
                null,proOp3,null,null,"accident3","incident3",o3,null));

 */
/*
        o1 = operationRepository.save(new Operation(null,s1,TypeOperation.Ovaire,
                Timestamp.valueOf("2018-09-01 09:01:15"),Timestamp.valueOf("2018-09-01 12:21:15"),null,p1,null,false,false,false));

        o2 = operationRepository.save(new Operation(null,s1,TypeOperation.Ovaire,
                Timestamp.valueOf("2018-09-01 09:01:15"),Timestamp.valueOf("2018-09-01 12:21:15"),null,p1,null,false,false,false));

        o3 = operationRepository.save(new Operation(null,s1,TypeOperation.Ovaire,
                Timestamp.valueOf("2018-09-01 09:01:15"),Timestamp.valueOf("2018-09-01 12:21:15"),null,p1,null,false,false,false));
        List<Operation> l1= new ArrayList<>();
        l1.add(o1);
        l1.add(o2);

        Produit_Utilise p,pr2,pr1,pr3,pr4;
        p = pro.save(new Produit_Utilise(null,"prod1",5,null,null));
        pr2 = pro.save(new Produit_Utilise(null,"prod2",7,null,null));
        pr1 = pro.save(new Produit_Utilise(null,"prod3",10,null,null));
        pr3 = pro.save(new Produit_Utilise(null,"prod4",3,null,null));
        pr4 = pro.save(new Produit_Utilise(null,"prod4",2,null,null));


        List<Produit_Utilise> list= new ArrayList<>();
        List<Produit_Utilise> list2= new ArrayList<>();  List<Produit_Utilise> list3=new ArrayList<>();
        list.add(pr1); list.add(pr2); list2.add(p);list2.add(pr3); list3.add(pr1); list3.add(pr4);
        Details d3 = detailsRepository.save(new Details(null,null,
                null,null,proOp1,proAn1,rev1,"accident1" ,"incident1" ,null,list,list2));

        Details d2 = detailsRepository.save(new Details(null,null,
                null,null,proOp2,proAn2,rev2,"accident2","incident2",o2,null,list2));

        Details d1 = detailsRepository.save(new Details(null,
                LocalDateTime.of(2022,02,22,10,45,01),
                LocalDateTime.of(2022,02,22,12,55,01),
                null,proOp3,proAn3,rev3,"accident3","incident3",o3,list,list3));

        System.out.println("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\n");
        //operationRepository.OperationByPersonnel("khelouf", "maria").forEach(System.out::println);
        //personnelRepository.getChirurgiens().forEach(System.out::println);
        //personnelRepository.getAnesthesisites().forEach(System.out::println);
        //operationRepository.OperationByAdressePatient("medea").forEach(System.out::println);

        //operationRepository.OperationByPatient("med", "amine").forEach(System.out::println);
        //operationRepository.OperationByAge(26).forEach(System.out::println);

        //operationRepository.OperationByAgeGreaterThan(25).forEach(System.out::println);
        //operationRepository.OperationByAgeLessThan(25).forEach(System.out::println);
        //operationRepository.OperationBySexe("Femme").forEach(System.out::println);
        //operationRepository.OperationByType("colon").forEach(System.out::println);

        //operationRepository.OperationBySalleOperatoire("A").forEach(System.out::println);

        //operationRepository.OperationByDateDebut(Date.valueOf("2020-01-01")).forEach(System.out::println);

        //operationRepository.OperationByDateDebutGreaterThan(Date.valueOf("2015-01-01")).forEach(System.out::println);
        //operationRepository.OperationByDateDebutLessThan(Date.valueOf("2015-01-01")).forEach(System.out::println);
        //operationRepository.OperationByAdressePatient("alger").forEach(System.out::println);
*/
/*
        LocalDateTime  from =d3.getDateDebutBloc();
        LocalDateTime to =d3.getDateFinBloc();
        Duration duration = Duration.between(from, to);
        //int dif = detail.getDateFinBloc().getMinute()-detail.getDateDebutBloc();
        //d3.setDuree(duration.toHours());
        //detailsRepository.save(d3);
        long HH = duration.toHours();
        long MM = duration.toMinutesPart();
        long SS = duration.toSecondsPart();
        String timeInHHMMSS = String.format("%02d:%02d:%02d", HH, MM, SS);
        d3.setDuree(timeInHHMMSS);
        detailsRepository.save(d3);*/
        LocalDateTime debut, fin;
        debut = LocalDateTime.of(2022,02,22,12,45,01);
        fin = LocalDateTime.of(2022,02,22,10,45,01);
/*
        int t = (fin.compareTo (debut)) ;
        if (t<0) {
            System.out.println("erreur");
        }

 */
        System.out.println("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\n");
        //ch1.getDateNaissance().getYear();
        /*
        int current = Calendar.getInstance().get(Calendar.YEAR);
        java.util.Date date = ch1.getDateNaissance();
        SimpleDateFormat df = new SimpleDateFormat("yyyy");
        int year = Integer.parseInt(df.format(date));
        System.out.println("date naissance \n");
        System.out.println(year);
        System.out.println("current year \n");
        System.out.println(current);
        System.out.println("age \n");
        int age = current-year;
        System.out.println(age);
        ch1.setAge(age);
        personnelRepository.save(ch1);
        System.out.println("ooooooooooooooooooooooooooooooooooooooo\n");*/
/*
        LocalDateTime  fromR =d3.getReveil().getDateDebutReveil();
        LocalDateTime toR =d3.getReveil().getDateFinReveil();
        Duration durationR = Duration.between(fromR, toR);
        //int dif = detail.getDateFinBloc().getMinute()-detail.getDateDebutBloc();
        //d3.setDuree(duration.toHours());
        //detailsRepository.save(d3);
        long HHR = durationR.toHours();
        long MMR = durationR.toMinutesPart();
        long SSR = durationR.toSecondsPart();
        String timeInHHMMSS = String.format("%02d:%02d:%02d", HHR, MMR, SSR);
        Reveil r= d3.getReveil();
        r.setDureeReveil(timeInHHMMSS);
        d3.setReveil(r);
        detailsRepository.save(d3);
*/
/*
        chirugien1 = chirurgien_residentRepository.save(new Chirurgien_resident(null, "hhhh",
                "kamel",2345678,"adr",Date.valueOf("1999-01-01"), Sexe.Femme,
                SituationFamiliale.Marie,3456,1234567,29,o1));
*/
/*
        Patient p3;
        p3 = patientRepository.save(new Patient(null,"amine",
                "mnaref",2345678,"adr", Date.valueOf("1999-01-01"),
                Sexe.Homme,SituationFamiliale.Celibataire,"alger",3456,
                1234567,25,null,null));

*/


        /**

         //o.setpPersonels(of(p));
         Collection<Personnel> c1 = new Collection<Personnel>() {
        @Override
        public int size() {
        return 0;
        }

        @Override
        public boolean isEmpty() {
        return false;
        }

        @Override
        public boolean contains(Object o) {
        return false;
        }

        @Override
        public Iterator<Personnel> iterator() {
        return null;
        }

        @Override
        public Object[] toArray() {
        return new Object[0];
        }

        @Override
        public <T> T[] toArray(T[] a) {
        return null;
        }

        @Override
        public boolean add(Personnel personnel) {
        return false;
        }

        @Override
        public boolean remove(Object o) {
        return false;
        }

        @Override
        public boolean containsAll(Collection<?> c) {
        return false;
        }

        @Override
        public boolean addAll(Collection<? extends Personnel> c) {
        return false;
        }

        @Override
        public boolean removeAll(Collection<?> c) {
        return false;
        }

        @Override
        public boolean retainAll(Collection<?> c) {
        return false;
        }

        @Override
        public void clear() {

        }
        };
         c1.add(p);
         Salle s = new Salle();
         Operation o = new Operation(null,s,d,p2,c1);
         operationRepository.save(o);

         */
    }
}
