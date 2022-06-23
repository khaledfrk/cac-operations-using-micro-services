package esi_cardio.com.auth_cardio.config;

import esi_cardio.com.auth_cardio.service.CustomUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfig  extends WebSecurityConfigurerAdapter {

    @Autowired
    CustomUserDetailService userDetailsService;

    @Autowired
    private CustomJwtAuthenticationFilter customJwtAuthenticationFilter;

    @Autowired
    private JwtAuthenticationEntryPoint unauthorizedHandler;


    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }



    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception
    {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    @Override

    protected void configure(HttpSecurity httpSecurity) throws Exception {
        // We don't need CSRF for this example
        httpSecurity.csrf().disable()
                .authorizeRequests().antMatchers(
                        "Admin/users/{id}"," /personnel/all")
                .hasRole("ADMIN")
                .antMatchers( "/a")
                .hasAnyRole("CHIRURGIEN")
                .antMatchers( "/a")
                .hasRole("INFERMIER")
                .antMatchers( "/a")
                .hasRole("RESIDENT")
                .antMatchers("/a")
                .hasRole("INSTRUMENTISTE")
                .antMatchers("/a")
                .hasRole("ANESTHESISTE")
                .antMatchers("/a")
                .hasRole("COORDINATEUR")
                .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .antMatchers("/authenticate","users/get/{username}","/register").permitAll().anyRequest().authenticated()
                //if any exception occurs call this
                .and().exceptionHandling()
                .authenticationEntryPoint(unauthorizedHandler).and().
                // make sure we use stateless session; session won't be used to
                // store user's state.
                        sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

// 		Add a filter to validate the tokens with every request
        httpSecurity.addFilterBefore(customJwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class);
    }

}
