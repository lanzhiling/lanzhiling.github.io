// BibTeX copy functionality for publications
document.addEventListener('DOMContentLoaded', function() {
    // BibTeX entries data
    const bibtexEntries = {
        'zheng2025uncore': `@inproceedings{zheng2025uncore,
  title={Exploring Uncore Frequency Scaling for Heterogeneous Computing},
  author={Zheng, Z. and Sultanov, S. and Papka, M. and Lan, Z.},
  booktitle={Proc. of ACM/IEEE SC},
  year={2025}
}`,
        'dearing2025llms': `@article{dearing2025llms,
  title={Leveraging LLMs to Automate Energy-Aware Refactoring of Parallel Scientific Codes},
  author={Dearing, M. and Tao, Y. and Wu, X. and Lan, Z. and Taylor, V.},
  journal={CoRR},
  volume={abs/2505.02184},
  year={2025},
  doi={10.48550/arXiv.2505.02184}
}`,
        'cornelius2025energy': `@article{cornelius2025energy,
  title={Extracting Practical, Actionable Energy Insights from Supercomputer Telemetry and Logs},
  author={Cornelius, M. and Cross, G. and Shilpika and Dearing, M. and Lan, Z.},
  journal={CoRR},
  volume={abs/2505.14796},
  year={2025},
  doi={10.48550/arXiv.2505.14796}
}`,
        'wang2025mfnetsim': `@article{wang2025mfnetsim,
  title={MFNetSim: A Multi-Fidelity Network Simulation Framework for Multi-Traffic Modeling of Dragonfly Systems},
  author={Wang, X. and Brown, K. and Ross, R. and Carothers, C. and Lan, Z.},
  journal={ACM Transactions on Modeling and Computer Simulation (TOMACS)},
  year={2025}
}`,
        'kurkure2025cqsim': `@inproceedings{kurkure2025cqsim,
  title={CQSim+: Symbiotic Simulation for Multi-Resource Scheduling in High-Performance Computing},
  author={Kurkure, Y. and Sharma, S. and Wang, X. and Papka, M. and Lan, Z.},
  booktitle={ACM SIGSIM PADS},
  year={2025}
}`,
        'wang2024preventing': `@article{wang2024preventing,
  title={Preventing Workload Interference with Intelligent Routing and Flexible Job Placement Strategy on Dragonfly System},
  author={Wang, X. and Kang, Y. and Lan, Z.},
  journal={ACM Transactions on Modeling and Computer Simulation (TOMACS)},
  year={2024},
  doi={10.1145/3649593}
}`,
        'cruz2024hybrid': `@article{cruz2024hybrid,
  title={Hybrid PDES Simulation of HPC Networks using Zombie Packets},
  author={Cruz-Camacho, E. and Brown, K. and Wang, X. and Xu, X. and Shu, K. and Lan, Z. and Ross, R. and Carothers, C.},
  journal={ACM Transactions on Modeling and Computer Simulation (TOMACS)},
  year={2024},
  doi={10.1145/3649189}
}`,
        'dearing2024lassi': `@inproceedings{dearing2024lassi,
  title={LASSI: An LLM-based Automated Self-Correcting Pipeline for Translating Parallel Scientific Codes},
  author={Dearing, M. and Tao, Y. and Wu, X. and Lan, Z. and Taylor, V.},
  booktitle={2024 International Workshop on Large Language Models and HPC (LLMxHPC)},
  year={2024}
}`,
        'wu2023performance': `@article{wu2023performance,
  title={Performance and Power Modeling and Prediction Using MuMMI and Ten Machine Learning Methods},
  author={Wu, X. and Taylor, V. and Lan, Z.},
  journal={Concurrency and Computation: Practice and Experience},
  year={2023},
  doi={10.1002/cpe.7536}
}`,
        'kang2023workload': `@inproceedings{kang2023workload,
  title={Workload Interference Prevention with Intelligent Routing and Flexible Job Placement on Dragonfly},
  author={Kang, Y. and Wang, X. and Lan, Z.},
  booktitle={ACM SIGSIM-PADS'23},
  year={2023},
  doi={10.1145/3573900.3591116}
}`,
        'xu2023machine': `@inproceedings{xu2023machine,
  title={Machine Learning for Interconnect Network Traffic Forecasting: Investigation and Exploitation},
  author={Xu, X. and Wang, X. and Cruz, E. and Carothers, C. and Brown, K. and Ross, R. and Lan, Z. and Shu, K.},
  booktitle={ACM SIGSIM-PADS'23},
  year={2023},
  doi={10.1145/3573900.3591117}
}`,
        'fan2022dras': `@article{fan2022dras,
  title={DRAS: Deep Reinforcement Learning for Cluster Scheduling in High Performance Computing},
  author={Fan, Y. and Li, B. and Favorite, D. and Singh, N. and Childers, T. and Rich, P. and Allcock, W. and Papka, M. and Lan, Z.},
  journal={IEEE Transactions on Parallel and Distributed Systems (TPDS)},
  year={2022},
  doi={10.1109/TPDS.2022.3178257}
}`
    };

    // Function to copy text to clipboard
    function copyToClipboard(text) {
        if (navigator.clipboard && window.isSecureContext) {
            // Modern clipboard API
            return navigator.clipboard.writeText(text);
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            return new Promise((resolve, reject) => {
                document.execCommand('copy') ? resolve() : reject();
                textArea.remove();
            });
        }
    }

    // Function to show temporary success message
    function showCopySuccess(element) {
        const originalText = element.textContent;
        element.textContent = 'Copied!';
        element.style.color = '#28a745';
        
        setTimeout(() => {
            element.textContent = originalText;
            element.style.color = '';
        }, 2000);
    }

    // Add click handlers to BibTeX links
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;
        
        const href = link.getAttribute('href');
        if (!href.startsWith('#')) return;
        
        const bibtexKey = href.substring(1);
        
        if (bibtexEntries[bibtexKey]) {
            e.preventDefault();
            
            copyToClipboard(bibtexEntries[bibtexKey])
                .then(() => {
                    showCopySuccess(link);
                })
                .catch((err) => {
                    console.error('Failed to copy BibTeX:', err);
                    // Fallback: try to create a temporary modal or alert
                    alert('BibTeX copied to clipboard:\n\n' + bibtexEntries[bibtexKey]);
                });
        }
    });

    // Optional: Add hover effect to indicate clickable BibTeX links
    const style = document.createElement('style');
    style.textContent = `
        a[href^="#"]:hover {
            text-decoration: underline;
            cursor: pointer;
        }
        
        a[href^="#"]:active {
            color: #28a745;
        }
    `;
    document.head.appendChild(style);
});
