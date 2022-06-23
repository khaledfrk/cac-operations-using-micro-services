package com.example.msoperation.API;

import com.example.msoperation.DOA.*;
import com.example.msoperation.Entities.*;
import com.example.msoperation.models.StatObj;
import com.example.msoperation.models.produit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import static java.lang.Integer.parseInt;

@RestController
@RequestMapping("rsu")
public class OperationAPIController {
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
    ProductRepo productRepo;
    @Autowired
    ArchiveRepo archiveRepo;


    /********************************************** Getters ********************************************/

    @GetMapping("/countOperation")  //GET http://localhost:8081/rsu/something
    public Long countOperation(){
        Long nb = operationRepository.countOperation();
        return nb;
    }

    @GetMapping("/countPersonnel")  //GET http://localhost:8081/rsu/something
    public Long countPersonnel(){
        Long nb = personnelRepository.countPersonnel();
        return nb;
    }


    @GetMapping("/something")  //GET http://localhost:8081/rsu/something
    public List<StatObj> getSomething(){
        List<String> l = personnelRepository.getSomething();
        List<StatObj> list = new ArrayList<>();
        String str;
        String[] arrOfStr;
        for(int i=0;i<l.size();i++){
            StatObj stat = new StatObj();
            str=l.get(i);
            arrOfStr = str.split(",");
            stat.setNom(arrOfStr[0]);
            stat.setNbOperation(parseInt(arrOfStr[1]));
            list.add(stat);
        }
        return list;
    }


    @GetMapping("/operation/{idOp}")  //GET http://localhost:8081/rsu/operations/1
    public Operation operationById(@PathVariable(value = "idOp") Long idOp){
        //Personnel p = personnelRepository.findPersonnelByUsername(username);
        Operation op = operationRepository.findOperationByIdOperation(idOp);
        return op;
    }

    @GetMapping("/operations/{username}")  //GET http://localhost:8081/rsu/operations/username
    public List<Operation> operationByUsername(@PathVariable(value = "username") String username){
        Personnel p = personnelRepository.findPersonnelByUsername(username);
        List<Operation> op = operationRepository.findByPersonnelsContains(p);
        return op;
    }


    @GetMapping("/personnelByUsername/{username}")
    public Personnel getProduct(@PathVariable(value = "username") String username) {
        return personnelRepository.findPersonnelByUsername(username);
    }


    @GetMapping("/patient/all") //GET http://localhost:8082/rsu/patient/all
    public List<Patient> getPatients() {
        return patientRepository.findAll();
    }


    @GetMapping("/operation/all")  //GET http://localhost:8081/rsu/operations/all
    public List<Operation> getOp(){
        List<Operation> op = operationRepository.findAll();
        return op;
    }


    @GetMapping("/personnel/all") //GET http://localhost:8081/rsu/personnel/all
    public List<Personnel> getPersonnels() {
        return personnelRepository.findAll();
    }


    @GetMapping("/chirurgien/all") //GET http://localhost:8081/rsu/chirurgien/all
    public List<Personnel> getChirurgiens() {
        return personnelRepository.getChirurgiens();
    }


    @GetMapping("/anesthesiste/all") //GET http://localhost:8082/rsu/anesthesiste/all
    public List<Personnel> getAnesthesisites() {
        return personnelRepository.getAnesthesisites();
    }

    @GetMapping("/infermier/all") //GET http://localhost:8082/rsu/infermier/all
    public List<Personnel> getInfermiers() {
        return personnelRepository.getInfermiers();
    }


    @GetMapping("/instrumentiste/all") //GET http://localhost:8081/rsu/instrumentiste/all
    public List<Personnel> getIinstrumentistes() {
        return personnelRepository.getInstrumentistes();
    }


    @GetMapping("/residant/all") //GET http://localhost:8081/rsu/residant/all
    public List<Personnel> getResidants() {
        return personnelRepository.getResidants();
    }


    @GetMapping("/coordinateur/all") //GET http://localhost:8082/rsu/Coordinateur/all
    public List<Personnel> getCoordinateurs() {
        return personnelRepository.getCoordinateurs();
    }


    @GetMapping("/salle/all") //GET http://localhost:8081/rsu/residant/all
    public List<SalleOperatoire> getSalles() {
        return salleOperatoireRepository.findAll();
    }


    /***************************************** insertion ************************************************************************************/



    @PostMapping("/insertDetails/{idOp}")
    public Operation insertDetail(@RequestBody Details detail,@PathVariable("idOp") Long idOp) {
        Operation o = operationRepository.findById(idOp).get();

        List<produit> l =  new ArrayList<>();
        l = detail.getProducts();
        List<Produit_Utilise> ll = new ArrayList<>();
        for(int i=0; i< l.size();i++){
            Produit_Utilise p = new Produit_Utilise();
            p.setNomP(l.get(i).getNomP());
            p.setQntP(l.get(i).getQntP());
            productRepo.save(p);
            ll.add(p);
        }
        detail.setProduitsCh(ll);
        //detail.setProducts(null);

        if (operationRepository.findById(idOp).isPresent()) {
            detail.setOperation(o);
            detailsRepository.save(detail);
            o.setDetails(detail);
            o.setStatChirugien(true);
            operationRepository.save(o);
        } else return null;
        /*
        //insertion duree bloc
        LocalDateTime  from =detail.getDateDebutBloc();
        LocalDateTime to =detail.getDateFinBloc();
        Duration duration = Duration.between(from, to);
        long HH = duration.toHours();
        long MM = duration.toMinutesPart();
        long SS = duration.toSecondsPart();
        String timeInHHMMSS = String.format("%02d:%02d:%02d", HH, MM, SS);
        detail.setDuree(timeInHHMMSS);

        //insertion duree reveil
        LocalDateTime  fromR =detail.getReveil().getDateDebutReveil();
        LocalDateTime toR =detail.getReveil().getDateFinReveil();
        Duration durationR = Duration.between(fromR, toR);
        long HHR = durationR.toHours();
        long MMR = durationR.toMinutesPart();
        long SSR = durationR.toSecondsPart();
        String timeInHHMMSSR = String.format("%02d:%02d:%02d", HHR, MMR, SSR);
        Reveil r= detail.getReveil();
        r.setDureeReveil(timeInHHMMSSR);
        detail.setReveil(r);

         */

        return o;
    }


    @PostMapping("/insertDetailsAnesthesie/{idOp}")
    public Operation insertDetailAnesthesie(@RequestBody Details detail,@PathVariable("idOp") Long idOp){
        /*
        Operation o = operationRepository.findById(idOp).get();
        if(operationRepository.findById(idOp).isPresent()){
            ProtocoleAnesthesie pro = new ProtocoleAnesthesie();
            if(detail.getProtocoleAnesthesie().getTechnique()!= null) {
                pro.setTechnique(detail.getProtocoleAnesthesie().getTechnique());
                pro.setNature(detail.getProtocoleAnesthesie().getNature());
                pro.setAgent(detail.getProtocoleAnesthesie().getAgent());
                pro.setDoseEntretien(detail.getProtocoleAnesthesie().getDoseEntretien());
                pro.setDoseInduction(detail.getProtocoleAnesthesie().getDoseInduction());
                pro.setSitePonction(detail.getProtocoleAnesthesie().getSitePonction());
                pro.setMateriel(detail.getProtocoleAnesthesie().getMateriel());

                o.getDetails().setProtocoleAnesthesie(pro);
                detailsRepository.save(o.getDetails());
                o.setDetails(o.getDetails());
            }else System.out.println("le protocole anesthesie /technique est null");
        }else return null;
        return o.getDetails();
         */

        Operation o = operationRepository.findById(idOp).get();

        List<produit> l =  new ArrayList<>();
        l = detail.getProducts();
        List<Produit_Utilise> ll = new ArrayList<>();
        for(int i=0; i< l.size();i++){
            Produit_Utilise p = new Produit_Utilise();
            p.setNomP(l.get(i).getNomP());
            p.setQntP(l.get(i).getQntP());
            productRepo.save(p);
            ll.add(p);
        }
        o.getDetails().setProduitsAn(ll);
        //detail.setProducts(null);


        if(operationRepository.findById(idOp).isPresent()){
            //o.getDetails().setProduitsAn(detail.getProduitsAn());
            ProtocoleAnesthesie pro = new ProtocoleAnesthesie();
            if(detail.getProtocoleAnesthesie().getTechnique()!= null) {
                pro.setTechnique(detail.getProtocoleAnesthesie().getTechnique());
                pro.setNature(detail.getProtocoleAnesthesie().getNature());
                pro.setAgent(detail.getProtocoleAnesthesie().getAgent());
                pro.setDoseEntretien(detail.getProtocoleAnesthesie().getDoseEntretien());
                pro.setDoseInduction(detail.getProtocoleAnesthesie().getDoseInduction());
                pro.setSitePonction(detail.getProtocoleAnesthesie().getSitePonction());
                pro.setMateriel(detail.getProtocoleAnesthesie().getMateriel());

                o.getDetails().setProtocoleAnesthesie(pro);
                detailsRepository.save(o.getDetails());
                o.setDetails(o.getDetails());
                o.setStatAnesthesiste(true);
                operationRepository.save(o);
            }else System.out.println("le protocole anesthesie /technique est null");
        }else return null;
        return o;

    }


    @PostMapping("/insertDetailsApres/{idOp}")
    public Operation insertDetailsApres(@RequestBody Details detail,@PathVariable("idOp") Long idOp){
        Operation o = operationRepository.findById(idOp).get();
        if(operationRepository.findById(idOp).isPresent()){
            o.getDetails().setAccidents(detail.getAccidents());
            o.getDetails().setIncidents(detail.getIncidents());
            o.getDetails().setDateFinBloc(detail.getDateFinBloc());
            int t = (o.getDetails().getDateFinBloc().compareTo (o.getDetails().getDateDebutBloc())) ;
            if (t<0) {
                System.out.println("erreur");
            }else{
                //insertion duree bloc
                LocalDateTime  from =o.getDetails().getDateDebutBloc();
                LocalDateTime to =detail.getDateFinBloc();
                Duration duration = Duration.between(from, to);
                long HH = duration.toHours();
                long MM = duration.toMinutesPart();
                long SS = duration.toSecondsPart();
                String timeInHHMMSS = String.format("%02d:%02d:%02d", HH, MM, SS);
                o.getDetails().setDuree(timeInHHMMSS);
            }

            Reveil rev = new Reveil();

            if(detail.getReveil()!= null) {
                rev.setNomReveil(detail.getReveil().getNomReveil());
                rev.setDateDebutReveil(detail.getReveil().getDateDebutReveil());
                rev.setDateFinReveil(detail.getReveil().getDateFinReveil());

                //insertion duree reveil
                LocalDateTime  fromR =detail.getReveil().getDateDebutReveil();
                LocalDateTime toR =detail.getReveil().getDateFinReveil();

                int t2 = (toR.compareTo (fromR)) ;
                if (t2<0) {
                    System.out.println("erreur");
                }else{
                    Duration durationR = Duration.between(fromR, toR);
                    long HHR = durationR.toHours();
                    long MMR = durationR.toMinutesPart();
                    long SSR = durationR.toSecondsPart();
                    String timeInHHMMSSR = String.format("%02d:%02d:%02d", HHR, MMR, SSR);
                    rev.setDureeReveil(timeInHHMMSSR);
                    //end
                }

                o.getDetails().setReveil(rev);
                detailsRepository.save(o.getDetails());
                o.setDetails(o.getDetails());
                o.setStatCoordinateur(true);
                operationRepository.save(o);
            }else System.out.println("reviel est nuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuull");
        }else return null;
        return o;
        /*
        Operation o = operationRepository.findById(idOp).get();
        if(operationRepository.findById(idOp).isPresent()){
            o.getDetails().setAccidents(detail.getAccidents());
            o.getDetails().setIncidents(detail.getIncidents());
            o.getDetails().setDateFinBloc(detail.getDateFinBloc());
            Reveil rev = new Reveil();

            if(detail.getReveil()!= null) {
                rev.setNomReveil(detail.getReveil().getNomReveil());
                rev.setDateDebutReveil(detail.getReveil().getDateDebutReveil());
                rev.setDateFinReveil(detail.getReveil().getDateFinReveil());
                o.getDetails().setReveil(rev);
                detailsRepository.save(o.getDetails());
                o.setDetails(o.getDetails());
                o.setStatCoordinateur(true);
                operationRepository.save(o);
            }else System.out.println("reviel est null");
        }else return null;
        return o.getDetails();
         */
    }

    @PostMapping("/insertDetailsDurant/{idOp}")
    public Operation insertDetailsDurant(@RequestBody Details detail,@PathVariable("idOp") Long idOp){

        Operation o = operationRepository.findById(idOp).get();
        if(operationRepository.findById(idOp).isPresent()){
            o.getDetails().setDateDebutBloc(detail.getDateDebutBloc());
            /*

            product checkboxes
             */
            detailsRepository.save(o.getDetails());
            o.setStatCoordinateur(true);
            operationRepository.save(o);
        }else return null;
        return o;
    }


    @PostMapping("/insertOperation")
    public Operation insertOp(@RequestBody Operation o){
        o.setStatCoordinateur(false);
        o.setStatChirugien(false);
        o.setStatAnesthesiste(false);
        operationRepository.save(o);
        return o;
    }


    @PostMapping("/insertSalleOperatoire")
    public SalleOperatoire insertSalle(@RequestBody SalleOperatoire s){
        salleOperatoireRepository.save(s);
        return s;
    }


    @PostMapping("/insertPeronnel")
    public Personnel insertPersonnel(@RequestBody Personnel p){
        int current = Calendar.getInstance().get(Calendar.YEAR);

        Date dateNaissance = p.getDateNaissance();
        SimpleDateFormat df = new SimpleDateFormat("yyyy");
        int year = parseInt(df.format(dateNaissance));

        int age = current-year;
        p.setAge(age);
        personnelRepository.save(p);
        return p;
    }


    @PostMapping("/insertPatient")  //POST http://localhost:8081/rsu/insertPatient
    public Patient createNewPatient(@RequestBody Patient p) {

        int current = Calendar.getInstance().get(Calendar.YEAR);

        Date dateNaissance = p.getDateNaissance();
        SimpleDateFormat df = new SimpleDateFormat("yyyy");
        int year = parseInt(df.format(dateNaissance));

        int age = current-year;
        p.setAge(age);
        patientRepository.save(p);
        return p;
    }



    /***************************************filters******************************************/

    @CrossOrigin
    @GetMapping("/operation/salle:{salle}")  //POST http://localhost:8081/rsu/operation/salle:A
    public List<Operation> getOperationBySalleOperatoire( @PathVariable("salle") String salle) {
        return operationRepository.OperationBySalleOperatoire(salle);
    }

    @CrossOrigin
    @GetMapping("/operation/datedebut:{date}")  //POST http://localhost:8081/rsu/operation/adresse:alger
    public List<Operation> getOperationByDateDebut( @PathVariable("date") Date date) {
        return operationRepository.OperationByDateDebut(date);
    }

    @CrossOrigin
    @GetMapping("/operation/adresse:{adr}")  //POST http://localhost:8081/rsu/operation/adresse:alger
    public List<Operation> getOperationByAdresse( @PathVariable("adr") String adr) {
        return operationRepository.OperationByAdressePatient(adr);
    }

    @CrossOrigin
    @GetMapping("/operation/pathologie:{type}")  // http://localhost:8082/rsu/operation/pathologie:colon
    public List<Operation> getOperationsByType(@PathVariable(value = "type") String type) {
        return operationRepository.OperationByType(type);
    }
    @CrossOrigin
    @GetMapping("/operation/sexe:{sexe}")  // http://localhost:8082/rsu/operation/sexe:Homme
    public List<Operation> getOperationsBySexe(@PathVariable(value = "sexe") String sexe) {
        return operationRepository.OperationBySexe(sexe);
    }

    @CrossOrigin
    @GetMapping("/operation/age_inf_a:{age}")  // http://localhost:8082/rsu/operation/age_inf_a:25
    public List<Operation> getOperationsByAgeLessThan(@PathVariable(value = "age") Integer age) {
        return operationRepository.OperationByAgeLessThan(age);
    }

    @CrossOrigin
    @GetMapping("/operation/age_sup_a:{age}")  // http://localhost:8082/rsu/operation/age_sup_a:25
    public List<Operation> getOperationsByAgeGreaterThan(@PathVariable(value = "age") Integer age) {
        return operationRepository.OperationByAgeGreaterThan(age);
    }

    @CrossOrigin
    @GetMapping("/operation/age:{age}")  // http://localhost:8082/rsu/operation/age:25
    public List<Operation> getOperationsByAge(@PathVariable(value = "age") Integer age) {
        return operationRepository.OperationByAge(age);
    }

    @CrossOrigin
    @GetMapping("/operation/patient:{nom}_{prenom}")  // http://localhost:8082/rsu/operation/patient:med_amine
    public List<Operation> getOperationsByPatient(@PathVariable(value = "nom") String nom,
                                              @PathVariable(value = "prenom") String prenom) {
        return operationRepository.OperationByPatient(nom,prenom);
    }

    @CrossOrigin
    @GetMapping("/productsUpdated") //GET http://localhost:8082/rsu/patient/all
    public List<ArchiveProduct> getDetails() {
        List<Produit_Utilise> p = productRepo.findAll();
        List<ArchiveProduct> q = new ArrayList<>();
        for(int i=0;i<p.size();i++){
            ArchiveProduct archive = new ArchiveProduct();
            archive.setNomP(p.get(i).getNomP());
            archive.setQntP(p.get(i).getQntP());
            q.add(archive);
            p.get(i).setQntP(0);
            productRepo.save(p.get(i));
        }
        return q;
    }


    /*
    @CrossOrigin
    @PostMapping("/insertOperation/{idD}/{idp}")
    public String insertOperation(@RequestBody List<Personnel> p,@RequestBody Operation o,@PathVariable(value = "idD") Long idD,@PathVariable(value = "idp") Long idP,@PathVariable(value = "idperso") Long idperso){
        if (detailsRepository.findById(idD).isPresent()) {
            o.setDetails(detailsRepository.findById(idD).get());
        }else{
            return "details id inexistant";
        }
        if (patientRepository.findById(idP).isPresent()) {
            o.setPatient(patientRepository.findById(idP).get());
        }else{
            return "patient id inexistant";
        }
        o.setPersonnels(p);
        operationRepository.save(o);
        return "L'operation est bien inseré";
    }

*/
   /*
    @GetMapping("/afficheOperations") //GET http://localhost:8082/rsu/operation/all
    public String getOperations(Model model) {
        List<Operation> operations = operationRepository.findAll();
        model.addAttribute("operations", operations);

        return "operations";
        //return "redirect:view";

    }
*/

}

